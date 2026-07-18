from fastapi import APIRouter, HTTPException
from app.schemas.request import ThreatVerifyRequest
from app.schemas.response import ThreatVerifyResponse
from app.agents.orchestrator import orchestrate_threat_analysis

router = APIRouter()

@router.post("/citizen/verify-threat", response_model=ThreatVerifyResponse)
def verify_threat(request: ThreatVerifyRequest):
    try:
        verdict = orchestrate_threat_analysis(request.text)
        return verdict
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent execution failure: {str(e)}")
