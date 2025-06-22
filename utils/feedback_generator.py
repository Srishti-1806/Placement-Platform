# utils/feedback_generator.py
from openai import OpenAI
import os

# Initialize the OpenAI client with your API key
client = OpenAI(api_key="")
def generate_feedback(transcript: str, speech_score: int, body_language_score: int) -> str:
    if not transcript:
        return "Error: Transcript is empty. Cannot generate feedback."

    prompt = f"""
You are an expert communication coach. A user has given a presentation.

Transcript:
\"\"\"{transcript}\"\"\"

Speech Score: {speech_score}/100
Body Language Score: {body_language_score}/100

Please give constructive, professional feedback in 4-5 sentences, including at least one strength and one area for improvement. Focus on both speech and body language.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant who gives feedback on presentations."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error generating feedback: {str(e)}"
