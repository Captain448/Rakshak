import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load env variables from root or backend folder
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def call_gemini_flash(system_instruction: str, prompt: str) -> str:
    """
    Call the Gemini Flash model with system instructions.
    """
    if not api_key:
        # For hackathon robustness when key is missing, return a structured fallback response
        # representing a mock analysis block
        return '{"fallback": true}'

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=system_instruction
    )
    
    response = model.generate_content(prompt)
    return response.text
