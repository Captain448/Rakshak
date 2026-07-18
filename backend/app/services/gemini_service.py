import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def call_gemini_flash(system_instruction: str, prompt: str, json_mode: bool = False) -> str:
    """
    Call the Gemini 3.5 Flash model with system instructions.
    Forces JSON response if json_mode is True.
    """
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not defined in the environment variables.")

    model = genai.GenerativeModel(
        model_name="gemini-3.5-flash",
        system_instruction=system_instruction
    )
    
    generation_config = {}
    if json_mode:
        generation_config["response_mime_type"] = "application/json"

    response = model.generate_content(
        prompt,
        generation_config=generation_config
    )
    return response.text
