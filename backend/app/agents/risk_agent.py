import json
from app.services.gemini_service import call_gemini_flash

SYSTEM_INSTRUCTION = """
You are the Citizen Risk Agent for Rakshak AI.
Your task is to analyze suspicious messages for social engineering patterns, coercive language, pressure tactics, and phishing structures.
Determine a risk level, assign a confidence score (0-100), classify the scam category, and provide detailed reasons and safety recommendations.
You must return a raw JSON object with the following structure:
{
  "risk_level": "LOW | MEDIUM | HIGH | CRITICAL",
  "score": 85,
  "category": "Fake KYC Scam | Digital Arrest | UPI Fraud | Lottery Fraud | Police Impersonation | General Phishing",
  "reasons": ["list of threat indicators detected in the text"],
  "recommendations": ["list of clear, actionable safety instructions for the citizen"]
}
Do not include any explanation, markdown formatting (like ```json), or header. Return only the raw JSON.
"""

def run_risk_agent(text: str) -> dict:
    prompt = f"Analyze threat characteristics for this message:\n\n{text}"
    response_text = call_gemini_flash(SYSTEM_INSTRUCTION, prompt)
    
    try:
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        return json.loads(cleaned)
    except Exception:
        return {
            "risk_level": "LOW",
            "score": 10,
            "category": "General Inquiry",
            "reasons": ["Automatic fallback activated - unable to parse AI response"],
            "recommendations": ["Exercise standard safety practices when dealing with unknown senders"]
        }
