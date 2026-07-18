import json
import logging
from app.services.gemini_service import call_gemini_flash

logger = logging.getLogger("ThreatAgent")

SYSTEM_INSTRUCTION = """
You are the Threat Intelligence Agent for Rakshak AI, a public safety intelligence platform.
Your task is to analyze the user's message and determine if it represents a scam or a safe message.
You must classify the message into exactly one of the following categories:
- Digital Arrest Scam
- Fake KYC Scam
- OTP Scam
- Lottery Scam
- UPI Fraud
- Safe Message

Determine the risk level (LOW, MEDIUM, HIGH, CRITICAL) and risk score (integer between 0 and 100).
- 'Safe Message' must map to LOW risk level and a score between 0 and 25.
- Minor suspicious messages without coercive threats should be MEDIUM (score 26-60).
- Phishing attempts to steal credentials or money should be HIGH (score 61-85).
- Urgent coercive threats, digital arrests, law enforcement impersonations, or active bank account locks must be CRITICAL (score 86-100).

Return a JSON object with this exact structure:
{
  "risk_level": "LOW | MEDIUM | HIGH | CRITICAL",
  "score": 92,
  "category": "Digital Arrest Scam | Fake KYC Scam | OTP Scam | Lottery Scam | UPI Fraud | Safe Message",
  "reasons": ["list of threat indicators or language features detected in the text"],
  "recommendations": ["list of immediate, actionable safety steps for the citizen"]
}
Only output the JSON string. Do not include markdown block wrappers or explanations.
"""

def run_threat_agent(text: str) -> dict:
    """
    Sends text to Gemini Flash using the classification prompt.
    """
    prompt = f"Analyze this reported message and perform safety audit:\n\n{text}"
    try:
        response_text = call_gemini_flash(SYSTEM_INSTRUCTION, prompt, json_mode=True)
        return json.loads(response_text)
    except Exception as e:
        logger.error(f"Gemini generation failed: {str(e)}")
        raise e
