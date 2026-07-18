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
    Validates, standardizes, and corrects threat analysis outputs.
    Ensures strict type compliance, risk level mapping, and score clamping.
    """
    # 1. Parse and clamp score
    score = data.get("score", 0)
    try:
        score = int(score)
    except (ValueError, TypeError):
        logger.warning(f"Invalid score data: {score}. Setting fallback 0.")
        score = 0
    score = max(0, min(100, score))

    # 2. Normalize category
    category = data.get("category", "Safe Message")
    if category not in VALID_CATEGORIES:
        logger.warning(f"Normalizing category from: {category}")
        cat_lower = str(category).lower()
        if "arrest" in cat_lower or "police" in cat_lower or "cbi" in cat_lower:
            category = "Digital Arrest Scam"
        elif "kyc" in cat_lower or "sim" in cat_lower or "block" in cat_lower:
            category = "Fake KYC Scam"
        elif "otp" in cat_lower or "password" in cat_lower:
            category = "OTP Scam"
        elif "lottery" in cat_lower or "prize" in cat_lower or "win" in cat_lower:
            category = "Lottery Scam"
        elif "upi" in cat_lower or "pay" in cat_lower or "collect" in cat_lower:
            category = "UPI Fraud"
        else:
            category = "Safe Message"

    # 3. Standardize risk_level and cross-check with score consistency
    risk_level = str(data.get("risk_level", "")).upper().strip()
    if risk_level not in VALID_LEVELS:
        logger.warning(f"Standardizing risk_level from score.")
        if score <= 25:
            risk_level = "LOW"
        elif score <= 60:
            risk_level = "MEDIUM"
        elif score <= 85:
            risk_level = "HIGH"
        else:
            risk_level = "CRITICAL"

    # Enforce coherence between risk_level and score ranges
    if category == "Safe Message":
        risk_level = "LOW"
        score = min(25, score)
    elif risk_level == "CRITICAL" and score <= 85:
        score = 88
    elif risk_level == "HIGH" and (score <= 60 or score > 85):
        score = 75
    elif risk_level == "MEDIUM" and (score <= 25 or score > 60):
        score = 45
    elif risk_level == "LOW" and score > 25:
        score = 15

    # 4. Standardize reasons list
    reasons = data.get("reasons", [])
    if not isinstance(reasons, list):
        reasons = [str(reasons)] if reasons else []
    reasons = [str(r) for r in reasons]
    if not reasons:
        reasons = (
            ["Suspect patterns matching fraudulent tactics detected"] 
            if category != "Safe Message" 
            else ["No active threat markers detected"]
        )

    # 5. Standardize recommendations list
    recommendations = data.get("recommendations", [])
    if not isinstance(recommendations, list):
        recommendations = [str(recommendations)] if recommendations else []
    recommendations = [str(rec) for rec in recommendations]
    if not recommendations:
        recommendations = (
            ["Cut call communication. Do not pay fees or share verification codes."] 
            if category != "Safe Message" 
            else ["Standard cyber vigilance is advised."]
        )

    return {
        "risk_level": risk_level,
        "score": score,
        "category": category,
        "reasons": reasons,
        "recommendations": recommendations
    }
