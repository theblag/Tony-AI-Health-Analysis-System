import os
import google.generativeai as genai
import PyPDF2
from io import BytesIO
from pydantic import BaseModel
import json

# Configure Gemini — HEALTH_AI_API must be set in Render's environment variables.
# The server will raise a clear error at startup if the key is missing.
_gemini_api_key = os.getenv("HEALTH_AI_API")
if not _gemini_api_key:
    raise RuntimeError(
        "HEALTH_AI_API environment variable is not set. "
        "Go to Render Dashboard → your service → Environment and add HEALTH_AI_API with your Gemini API key."
    )
genai.configure(api_key=_gemini_api_key)

# Define the expected JSON structure using a Pydantic-like approach for prompt instructions
system_instruction = """
You are an expert AI medical analyst. Read the provided text extracted from a medical report.
You must output ONLY valid JSON using the following structure. Do not wrap it in markdown code blocks.
{
  "disease_type": "string (e.g., 'Heart Disease', 'Diabetes', 'General Health')",
  "risk_score": "float (a score from 0.0 to 100.0 representing risk level based on the report)",
  "concerns": "string (A paragraph summarizing the main medical concerns found in the report)",
  "exercise_plan": "string (A suggested daily or weekly exercise plan to help mitigate the risks)",
  "food_plan": "string (A suggested diet plan or dietary restrictions)",
  "overall_status": "string (One of: 'High Risk', 'Moderate Risk', 'Low Risk', 'Improving', 'Worsening')"
}
"""

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    reader = PyPDF2.PdfReader(BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

def analyze_report_with_gemini(extracted_text: str) -> dict:
    model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_instruction)
    response = model.generate_content(f"Here is the medical report text:\n{extracted_text}")
    
    # Strip markdown if Gemini accidentally included it
    output_text = response.text.strip()
    if output_text.startswith("```json"):
        output_text = output_text[7:]
    if output_text.startswith("```"):
        output_text = output_text[3:]
    if output_text.endswith("```"):
        output_text = output_text[:-3]
        
    return json.loads(output_text.strip())

def analyze_trend_with_gemini(historical_reports: list[str], latest_report: str) -> dict:
    prompt = "Here is the patient's history of reports (oldest to newest):\n"
    for i, report in enumerate(historical_reports):
        prompt += f"Report {i+1}:\n{report}\n\n"
    prompt += f"Here is the LATEST report:\n{latest_report}\n\n"
    prompt += "Compare the latest report to the history. Determine if the patient's condition is improving or worsening. Update the 'overall_status' to 'Improving' or 'Worsening'."
    
    model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_instruction)
    response = model.generate_content(prompt)
    
    output_text = response.text.strip()
    if output_text.startswith("```json"):
        output_text = output_text[7:]
    if output_text.startswith("```"):
        output_text = output_text[3:]
    if output_text.endswith("```"):
        output_text = output_text[:-3]
        
    return json.loads(output_text.strip())
