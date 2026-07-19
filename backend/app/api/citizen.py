import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.schemas.request import ThreatVerifyRequest
from app.schemas.response import ThreatVerifyResponse
from app.agents.orchestrator import orchestrate_threat_analysis
from app.services.alert_service import create_alert_from_threat
from app.storage.alert_store import get_all_alerts
from app.models.report import ReportModel
from app.storage.report_store import add_report
from app.models.entity import EntityStatus
from app.storage.entity_store import find_entity_by_value, get_all_entities

router = APIRouter()

@router.post("/citizen/verify-threat", response_model=ThreatVerifyResponse)
def verify_threat(request: ThreatVerifyRequest):
    try:
        sender_verified = False
        sender_blocked = False
        sender_status = "UNKNOWN"
        sender_report_count = 0
        sender_confidence_score = 0.0
        
        # 1. Search reputation registry for sender handle
        if request.sender_handle:
            entity = find_entity_by_value(request.sender_handle)
            if entity:
                sender_status = entity.status.value
                sender_report_count = entity.report_count
                sender_confidence_score = entity.confidence_score
                if entity.status == EntityStatus.VERIFIED:
                    sender_verified = True
                elif entity.status == EntityStatus.BLOCKED:
                    sender_blocked = True

        # 2. Execute dynamic LLM threat analysis
        verdict = orchestrate_threat_analysis(request.text)
        
        # 3. Check for Sender Blacklist Overrides
        if sender_blocked:
            verdict["risk_level"] = "CRITICAL"
            verdict["score"] = 100
            verdict["category"] = "Blocked Scammer Node"
            
            reasons = verdict.get("reasons", [])
            blocked_reason = "🚨 SENDER BLOCKED: Sender matches a blacklisted contact in the National Reputation Intelligence System."
            if blocked_reason not in reasons:
                reasons.insert(0, blocked_reason)
            verdict["reasons"] = reasons
            
            recs = verdict.get("recommendations", [])
            blocked_rec = "Do not communicate with this sender. Block and delete immediately."
            if blocked_rec not in recs:
                recs.insert(0, blocked_rec)
            verdict["recommendations"] = recs

        # 4. Scan message body for OTHER blacklisted entities (domains, phone numbers, UPI handles)
        all_ents = get_all_entities()
        for ent in all_ents:
            if ent.status in [EntityStatus.BLOCKED, EntityStatus.HIGH_RISK]:
                # Simple substring check (e.g. "sbi-kyc-verify.in" inside the text)
                if ent.value.lower() in request.text.lower():
                    verdict["risk_level"] = "CRITICAL"
                    verdict["score"] = 100
                    
                    reasons = verdict.get("reasons", [])
                    indicator_warn = f"🚨 BLACKLISTED INDICATOR: Message contains a known malicious signature: '{ent.value}' ({ent.type.value} marked as {ent.status.value})."
                    if indicator_warn not in reasons:
                        reasons.insert(0, indicator_warn)
                    verdict["reasons"] = reasons

        # 5. Populate response reputation parameters
        verdict["sender_verified"] = sender_verified
        verdict["sender_blocked"] = sender_blocked
        verdict["sender_status"] = sender_status
        verdict["sender_report_count"] = sender_report_count
        verdict["sender_confidence_score"] = sender_confidence_score
        
        # Trigger alert creation/deduplication if risk is HIGH or CRITICAL
        alert_id = create_alert_from_threat(verdict, request.text)
        
        # Log citizen report with trace pointer to alert_id
        report = ReportModel(
            id=f"rep-{uuid.uuid4().hex[:6]}",
            text=request.text,
            timestamp=datetime.now().isoformat(),
            category=verdict.get("category", "Safe Message"),
            risk_level=verdict.get("risk_level", "LOW"),
            alert_id=alert_id,
            user_id=request.user_id
        )
        add_report(report)
        
        return verdict
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent execution failure: {str(e)}")

@router.get("/alerts")
def get_alerts_endpoint():
    """
    Exposes active security alerts catalog.
    """
    alerts_list = get_all_alerts()
    return {
        "count": len(alerts_list),
        "alerts": alerts_list
    }
