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

router = APIRouter()

@router.post("/citizen/verify-threat", response_model=ThreatVerifyResponse)
def verify_threat(request: ThreatVerifyRequest):
    try:
        verdict = orchestrate_threat_analysis(request.text)
        
        # Trigger alert creation/deduplication if risk is HIGH or CRITICAL
        alert_id = create_alert_from_threat(verdict, request.text)
        
        # Log citizen report with trace pointer to alert_id
        report = ReportModel(
            id=f"rep-{uuid.uuid4().hex[:6]}",
            text=request.text,
            timestamp=datetime.now().isoformat(),
            category=verdict.get("category", "Safe Message"),
            risk_level=verdict.get("risk_level", "LOW"),
            alert_id=alert_id
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

