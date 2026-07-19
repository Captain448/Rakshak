from pydantic import BaseModel
from typing import List

class ThreatVerifyResponse(BaseModel):
    risk_level: str
    score: int
    category: str
    reasons: List[str]
    recommendations: List[str]
    sender_verified: bool = False
    sender_blocked: bool = False
    sender_status: str = "UNKNOWN"
    sender_report_count: int = 0
    sender_confidence_score: float = 0.0
