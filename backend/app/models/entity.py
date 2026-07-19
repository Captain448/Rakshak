from enum import Enum
from pydantic import BaseModel, Field
from typing import List, Set, Optional

class EntityType(str, Enum):
    PHONE = "phone"
    SMS_SENDER = "sms_sender"
    UPI = "upi"
    EMAIL = "email"
    DOMAIN = "domain"
    SOCIAL_HANDLE = "social_handle"

class EntityStatus(str, Enum):
    UNKNOWN = "UNKNOWN"
    SUSPECTED = "SUSPECTED"
    HIGH_RISK = "HIGH_RISK"
    BLOCKED = "BLOCKED"
    VERIFIED = "VERIFIED"

class EvidenceSample(BaseModel):
    reported_by: str
    message_text: str
    timestamp: str
    gemini_score: float

class TrustEntityModel(BaseModel):
    id: str
    value: str
    type: EntityType
    status: EntityStatus = EntityStatus.UNKNOWN
    organization: str = ""
    report_count: int = 0
    confidence_score: float = 0.0
    gemini_risk_average: float = 0.0
    officer_verified: bool = False
    officer_blocked: bool = False
    blocked_reason: str = ""
    verified_source: str = ""
    first_reported_at: str
    last_reported_at: str
    created_at: str
    updated_at: str
    unique_reporters: Set[str] = Field(default_factory=set)
    evidence_samples: List[EvidenceSample] = Field(default_factory=list)
    history: List[dict] = Field(default_factory=list)
