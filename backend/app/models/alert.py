from pydantic import BaseModel
from typing import List, Optional

class AlertModel(BaseModel):
    id: str
    title: str
    category: str
    risk_level: str
    timestamp: str
    location: Optional[str] = None
    summary: str
    advisory: str
    source_message: str
    incident_count: int
    recommended_action: List[str]
    status: str = "ACTIVE"
    updated_at: str
    status_changed_by: str = "System"
    history: List[dict] = []
