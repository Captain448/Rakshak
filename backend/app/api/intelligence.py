from fastapi import APIRouter, HTTPException
from datetime import datetime
import uuid
from pydantic import BaseModel
from typing import Optional
from app.models.entity import TrustEntityModel, EntityType, EntityStatus, EvidenceSample
from app.storage.entity_store import find_entity_by_value, add_entity
from app.services.reputation_service import update_reputation_metrics
from app.agents.orchestrator import orchestrate_threat_analysis

router = APIRouter()

class IntelligenceReportRequest(BaseModel):
    user_id: str
    entity_value: str
    entity_type: EntityType
    message_text: Optional[str] = None

@router.post("/report")
def report_suspicious_entity(req: IntelligenceReportRequest):
    """
    Submits a new citizen report for a phone number, UPI handle, website, or SMS sender ID.
    Updates unique reporter lists, evaluates AI threat scores, and computes reputation confidence.
    """
    now_str = datetime.now().strftime("%d-%m-%Y %I:%M %p")
    entity = find_entity_by_value(req.entity_value)
    
    is_new = False
    if not entity:
        is_new = True
        entity = TrustEntityModel(
            id=f"ent-{uuid.uuid4().hex[:6]}",
            value=req.entity_value.strip(),
            type=req.entity_type,
            status=EntityStatus.UNKNOWN,
            first_reported_at=now_str,
            last_reported_at=now_str,
            created_at=now_str,
            updated_at=now_str
        )
        
    # Check duplicate reporter
    is_duplicate = req.user_id in entity.unique_reporters
    
    if not is_duplicate:
        entity.unique_reporters.add(req.user_id)
        entity.report_count = len(entity.unique_reporters)
        entity.history.append({
            "event": f"Citizen report submitted by user: {req.user_id}",
            "time": now_str
        })
    else:
        # For duplicates, only update reporting timestamps
        entity.last_reported_at = now_str
        entity.updated_at = now_str
        
    # Analyze message evidence using Gemini if provided
    if req.message_text and req.message_text.strip():
        try:
            verdict = orchestrate_threat_analysis(req.message_text)
            gemini_score = float(verdict.get("score", 0))
        except Exception:
            gemini_score = 50.0  # Safe fallback if gemini offline
            
        # Update cumulative Gemini risk average
        total_samples = len(entity.evidence_samples)
        if total_samples == 0:
            entity.gemini_risk_average = gemini_score
        else:
            # Re-calculate cumulative average based on current history length
            entity.gemini_risk_average = ((entity.gemini_risk_average * total_samples) + gemini_score) / (total_samples + 1)
            
        # Append new evidence sample
        sample = EvidenceSample(
            reported_by=req.user_id,
            message_text=req.message_text.strip(),
            timestamp=now_str,
            gemini_score=gemini_score
        )
        entity.evidence_samples.append(sample)
        
        # Evict oldest if exceeding capacity threshold (keep latest 10)
        if len(entity.evidence_samples) > 10:
            entity.evidence_samples.pop(0)

    # Recalculate reputation scores and status brackets
    update_reputation_metrics(entity)
    
    if is_new:
        add_entity(entity)
        
    return entity
