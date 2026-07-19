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
from app.storage.scammer_store import is_scammer_contact
from app.storage.verified_store import is_verified_contact

router = APIRouter()

@router.post("/citizen/verify-threat", response_model=ThreatVerifyResponse)
def verify_threat(request: ThreatVerifyRequest):
    try:
        sender_blacklisted = False
        sender_verified = False
        
        # Check blacklist and verified contact stores
        if request.sender_handle:
            if is_scammer_contact(request.sender_handle):
                sender_blacklisted = True
            elif is_verified_contact(request.sender_handle):
                sender_verified = True
                
        # Run standard LLM agent analysis
        verdict = orchestrate_threat_analysis(request.text)
        
        # Check if we should override/inject scammer warning status
        if sender_blacklisted:
            verdict["risk_level"] = "CRITICAL"
            verdict["score"] = 100
            verdict["category"] = verdict.get("category", "Verified Scam")
            
            reasons = verdict.get("reasons", [])
            blacklisted_reason = "🚨 SENDER MATCH: Sender contact is a verified entry in the National Scammer Registry."
            if blacklisted_reason not in reasons:
                reasons.insert(0, blacklisted_reason)
            verdict["reasons"] = reasons
            
            recommendations = verdict.get("recommendations", [])
            blacklisted_rec = "Do not call or reply to this sender handle. Report directly to law enforcement."
            if blacklisted_rec not in recommendations:
                recommendations.insert(0, blacklisted_rec)
            verdict["recommendations"] = recommendations

        # Inject verified status
        verdict["sender_verified"] = sender_verified
        verdict["sender_blacklisted"] = sender_blacklisted
        
        # Trigger alert creation/deduplication if risk is HIGH or CRITICAL
        alert_id = create_alert_from_threat(verdict, request.text)
        
        # Log citizen report with trace pointer to alert_id and link user_id if present
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
