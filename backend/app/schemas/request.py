from pydantic import BaseModel
from typing import Optional

class ThreatVerifyRequest(BaseModel):
    text: str
    sender_handle: Optional[str] = None
    user_id: Optional[str] = None
