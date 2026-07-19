import uuid
import logging
from datetime import datetime, timedelta
from typing import Optional
from app.models.alert import AlertModel
from app.storage.alert_store import (
    add_alert,
    find_recent_alert_by_category,
    increment_incident_count_in_store
)

logger = logging.getLogger("AlertService")

RECOMMENDATIONS_MAP = {
    "Digital Arrest Scam": [
        "Do not transfer money.",
        "Disconnect the call immediately.",
        "Report to the cybercrime helpline (call 1930)."
    ],
    "Fake KYC Scam": [
        "Ignore suspicious KYC links.",
        "Visit the official bank website directly.",
        "Report phishing attempts."
    ],
    "OTP Scam": [
        "Never share OTPs.",
        "Block the sender.",
        "Contact your bank."
    ],
    "UPI Fraud": [
        "Verify payment requests.",
        "Do not scan unknown QR codes.",
        "Freeze transactions if needed."
    ],
    "Safe Message": [
        "No action required."
    ]
}

def create_alert_from_threat(threat_result: dict, original_text: str) -> Optional[str]:
    """
    Evaluates threat verification output. If the risk level is HIGH or CRITICAL:
    - Runs a deduplication search (matches same category within a 24-hour window).
    - If a matching alert exists, increments its incident count.
    - Otherwise, instantiates a new AlertModel and adds it to the store.
    """
    risk_level = str(threat_result.get("risk_level", "")).upper()
    if risk_level not in ["HIGH", "CRITICAL"]:
        logger.info(f"Skipping alert creation: Risk level '{risk_level}' is below threshold.")
        return None

    category = threat_result.get("category", "General Phishing")

    # 1. Deduplication check (within 24 hours of matching category)
    recent_alert = find_recent_alert_by_category(category)
    if recent_alert:
        try:
            alert_time = datetime.strptime(recent_alert.timestamp, "%d-%m-%Y %I:%M %p")
            time_diff = datetime.now() - alert_time
            if time_diff <= timedelta(hours=24):
                logger.info(f"Deduplication matched: Incrementing count on alert '{recent_alert.id}' for category '{category}'")
                increment_incident_count_in_store(recent_alert.id)
                return recent_alert.id
        except Exception as e:
            logger.warning(f"Error parsing timestamp during deduplication: {str(e)}. Defaulting to incrementing count.")
            increment_incident_count_in_store(recent_alert.id)
            return recent_alert.id

    # 2. Heuristically extract location keyword indicators
    location = None
    text_lower = original_text.lower()
    if "delhi" in text_lower:
        location = "New Delhi, Delhi"
    elif "mumbai" in text_lower or "customs" in text_lower:
        location = "Mumbai City, Maharashtra"
    elif "noida" in text_lower:
        location = "Gautam Buddha Nagar (Noida), Uttar Pradesh"
    elif "gurugram" in text_lower or "haryana" in text_lower:
        location = "Gurugram, Haryana"
    elif "jamtara" in text_lower or "jharkhand" in text_lower:
        location = "Jamtara, Jharkhand"

    # 3. Pull or fall back to standard recommended actions
    recommended_actions = threat_result.get("recommendations", [])
    if not isinstance(recommended_actions, list) or not recommended_actions:
        recommended_actions = RECOMMENDATIONS_MAP.get(category, ["Exercise standard safety vigilance."])

    # 4. Formulate alert metadata
    title = f"Alert: Active {category} Wave Detected"
    if location:
        title += f" in {location.split(',')[0]}"

    reasons = threat_result.get("reasons", [])
    summary = reasons[0] if reasons else f"An active campaign of {category} has been reported by citizens."
    advisory = recommended_actions[0] if recommended_actions else "Do not engage with the suspicious message sender."

    # 5. Save new alert
    new_alert_id = f"alt-{uuid.uuid4().hex[:6]}"
    current_time_str = datetime.now().strftime("%d-%m-%Y %I:%M %p")

    new_alert = AlertModel(
        id=new_alert_id,
        title=title,
        category=category,
        risk_level=risk_level,
        timestamp=current_time_str,
        location=location,
        summary=summary,
        advisory=advisory,
        source_message=original_text,
        incident_count=1,
        recommended_action=recommended_actions,
        status="ACTIVE",
        updated_at=current_time_str,
        status_changed_by="System",
        history=[
            {"event": "Alert created", "time": current_time_str}
        ]
    )

    logger.info(f"Instantiated new alert: '{new_alert_id}' for category '{category}'")
    add_alert(new_alert)
    return new_alert_id
