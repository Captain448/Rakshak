import logging

logger = logging.getLogger("RiskAgent")

VALID_LEVELS = {"LOW", "MEDIUM", "HIGH", "CRITICAL"}
VALID_CATEGORIES = {
    "Digital Arrest Scam",
    "Fake KYC Scam",
    "OTP Scam",
    "Lottery Scam",
    "UPI Fraud",
    "Safe Message"
}

def validate_risk_metrics(data: dict) -> dict:
    """
    Validates and standardizes the threat analysis payload.
    - Clamps score between 0 and 100.
    - Maps score brackets to risk levels:
      0–30 -> LOW
      31–60 -> MEDIUM
      61–89 -> HIGH
      90–100 -> CRITICAL
    - Preserves category, reasons, and recommendations.
    """
    # 1. Parse and clamp score
    score = data.get("score", 0)
    try:
        score = int(score)
    except (ValueError, TypeError):
        logger.warning(f"Invalid score value received: {score}. Setting fallback to 0.")
        score = 0
    score = max(0, min(100, score))

    # 2. Convert score ranges into risk levels
    if score <= 30:
        risk_level = "LOW"
    elif score <= 60:
        risk_level = "MEDIUM"
    elif score <= 89:
        risk_level = "HIGH"
    else:
        risk_level = "CRITICAL"

    # 3. Preserve category
    category = data.get("category", "Safe Message")

    # 4. Standardize reasons list
    reasons = data.get("reasons", [])
    if not isinstance(reasons, list):
        reasons = [str(reasons)] if reasons else []
    reasons = [str(r) for r in reasons]

    # 5. Standardize recommendations list
    recommendations = data.get("recommendations", [])
    if not isinstance(recommendations, list):
        recommendations = [str(recommendations)] if recommendations else []
    recommendations = [str(rec) for rec in recommendations]

    return {
        "risk_level": risk_level,
        "score": score,
        "category": category,
        "reasons": reasons,
        "recommendations": recommendations
    }

