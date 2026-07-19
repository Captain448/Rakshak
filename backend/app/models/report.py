from pydantic import BaseModel
from typing import Optional

class ReportModel(BaseModel):
    id: str
    text: str
    timestamp: str
    category: str
    risk_level: str
    alert_id: Optional[str] = None
    user_id: Optional[str] = None
