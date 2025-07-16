from dotenv import load_dotenv
import os

load_dotenv()  # MUST be called before os.getenv

from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

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
            model="llama3-8b-8192",
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
