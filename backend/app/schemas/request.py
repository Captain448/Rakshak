from pydantic import BaseModel

class ThreatVerifyRequest(BaseModel):
    text: str
