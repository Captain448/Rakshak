import json
from app.services.gemini_service import call_gemini_flash

SYSTEM_INSTRUCTION = """
You are the Threat Intelligence Agent for Rakshak AI.
Your task is to analyze reported scam messages and extract suspect identifiers (phone numbers, UPI IDs, bank accounts, domain URLs).
You must return a raw JSON object with the following structure:
{
  "extracted_phones": ["list of phone numbers starting with country code e.g. +91"],
  "extracted_upis": ["list of UPI handles/IDs"],
  "extracted_domains": ["list of suspicious web links"]
}
Do not include any explanation, markdown formatting (like ```json), or header. Return only the raw JSON.
"""

def run_threat_agent(text: str) -> dict:
    prompt = f"Extract threat indicators from this message:\n\n{text}"
    response_text = call_gemini_flash(SYSTEM_INSTRUCTION, prompt)
    
    try:
        # Strip markdown fences if returned
        cleaned = response_text.replace("```json", "").replace("```", "").strip()
        return json.loads(cleaned)
    except Exception:
        return {
            "extracted_phones": [],
            "extracted_upis": [],
            "extracted_domains": []
        }
