import logging
from app.agents.threat_agent import run_threat_agent
from app.agents.risk_agent import validate_risk_metrics

logger = logging.getLogger("Orchestrator")

def orchestrate_threat_analysis(text: str) -> dict:
    """
    Coordinates the multi-agent security pipeline: ThreatAgent -> RiskAgent.
    Catches and handles failures gracefully by returning a safe default fallback.
    """
    try:
        logger.info("Orchestrating security agents...")
        # 1. Run Threat Intelligence Agent (Gemini call)
        raw_threat_data = run_threat_agent(text)
        
        # 2. Run Risk Agent (Validation & normalization checks)
        validated_data = validate_risk_metrics(raw_threat_data)
        return validated_data

    except Exception as e:
        logger.error(f"Orchestration pipeline execution error: {str(e)}")
        
        # Dynamic fallback parser matching keyword indicators
        category = "Safe Message"
        risk_level = "LOW"
        score = 15
        text_lower = text.lower()

        if any(w in text_lower for w in ["arrest", "police", "cbi", "ed", "customs", "warrant"]):
            category = "Digital Arrest Scam"
            risk_level = "CRITICAL"
            score = 90
        elif any(w in text_lower for w in ["kyc", "block", "sbi", "sim", "unblock", "suspend"]):
            category = "Fake KYC Scam"
            risk_level = "HIGH"
            score = 80
        elif any(w in text_lower for w in ["otp", "password", "code", "pin", "verify"]):
            category = "OTP Scam"
            risk_level = "HIGH"
            score = 78
        elif any(w in text_lower for w in ["lottery", "prize", "win", "crore", "lakh", "gift"]):
            category = "Lottery Scam"
            risk_level = "HIGH"
            score = 75
        elif any(w in text_lower for w in ["upi", "pay", "collect", "request", "transfer"]):
            category = "UPI Fraud"
            risk_level = "HIGH"
            score = 70

        reasons = [
            "Local safety rules triggered (Gemini service connection fallback activated)."
        ]
        if category != "Safe Message":
            reasons.append(f"Identified terms matching signature patterns of a {category}.")
            recommendations = [
                "Do NOT follow instructions or click links in the message.",
                "Cut communications immediately and block the sender.",
                "Government agencies never serve notices or warrants over video calls or chat apps."
            ]
        else:
            reasons.append("No suspicious coercion or financial demands identified in message.")
            recommendations = ["Standard safety vigilance is advised when dealing with unfamiliar contacts."]

        return {
            "risk_level": risk_level,
            "score": score,
            "category": category,
            "reasons": reasons,
            "recommendations": recommendations
        }
