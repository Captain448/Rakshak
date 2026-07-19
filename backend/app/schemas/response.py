from pydantic import BaseModel
from typing import List

class ThreatVerifyResponse(BaseModel):
    risk_level: str
    score: int
    category: str
    reasons: List[str]
    recommendations: List[str]
    sender_verified: bool = False
    sender_blacklisted: bool = False
