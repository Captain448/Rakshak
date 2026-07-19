from app.models.entity import TrustEntityModel, EntityStatus

def update_reputation_metrics(entity: TrustEntityModel) -> None:
    """
    Recalculates the trust confidence score and updates status thresholds
    based on community report logs, officer overrides, and Gemini threat scores.
    """
    # 1. Calculate report score: clamps report count at 25 reports (=100 score)
    report_score = min(entity.report_count * 4, 100)
    
    # 2. Calculate officer score: 100 if manually verified or blocked, otherwise 0
    officer_score = 100.0 if (entity.officer_verified or entity.officer_blocked) else 0.0
    
    # 3. Calculate weighted confidence score
    confidence_raw = (0.5 * report_score) + (0.3 * entity.gemini_risk_average) + (0.2 * officer_score)
    entity.confidence_score = max(0.0, min(100.0, confidence_raw))
    
    # 4. Map status thresholds
    if entity.officer_blocked:
        entity.status = EntityStatus.BLOCKED
    elif entity.officer_verified:
        entity.status = EntityStatus.VERIFIED
    else:
        # Standard Community Thresholds
        if entity.report_count <= 2:
            entity.status = EntityStatus.UNKNOWN
        elif 3 <= entity.report_count <= 9:
            entity.status = EntityStatus.SUSPECTED
        elif 10 <= entity.report_count <= 24:
            entity.status = EntityStatus.HIGH_RISK
        else: # 25+ reports
            if entity.confidence_score >= 75.0:
                entity.status = EntityStatus.BLOCKED
            else:
                entity.status = EntityStatus.HIGH_RISK
