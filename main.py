from fastapi import FastAPI, UploadFile, File, HTTPException, Request, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse
from pydantic import BaseModel
from typing import Optional
from pathlib import Path
from PyPDF2 import PdfReader

import os
import shutil
import subprocess
import sys
import uvicorn

# --- Load custom modules safely ---
try:
    from utils.transcriber import transcribe_audio
    print("Transcriber loaded")
except Exception as e:
    transcribe_audio = None
    print(f"Transcriber failed: {e}")

try:
    from utils.body_language import analyze_body_language
    print("Body language analyzer loaded")
except Exception as e:
    analyze_body_language = None
    print(f"Body language analyzer failed: {e}")

try:
    from utils.speech_analysis import analyze_speech
    print("Speech analyzer loaded")
except Exception as e:
    analyze_speech = None
    print(f"Speech analyzer failed: {e}")

try:
    from utils.feedback_generator import generate_feedback
    print("Feedback generator loaded")
except Exception as e:
    generate_feedback = None
    print(f"Feedback generator failed: {e}")

try:
    from utils.report_generator import generate_pdf_report
    print("Report generator loaded")
except Exception as e:
    generate_pdf_report = None
    print(f"Report generator failed: {e}")

try:
    from webcam_recorder import record_from_webcam
    print("Webcam recorder loaded")
except Exception as e:
    record_from_webcam = None
    print(f"Webcam recorder failed: {e}")

try:
    from utils.ats_calculator import ATSCalculator
    ats_calculator = ATSCalculator()
    print("ATS Calculator loaded")
except Exception as e:
    ats_calculator = None
    print(f"ATS Calculator failed: {e}")

try:
    from utils.job_scraper import JobScraper
    job_scraper = JobScraper()
    print("Job Scraper loaded")
except Exception as e:
    job_scraper = None
    print(f"Job Scraper failed: {e}")

try:
    from utils.pdf_summarizer import PDFSummarizer
    pdf_summarizer = PDFSummarizer()
    print("PDF Summarizer loaded")
except Exception as e:
    pdf_summarizer = None
    print(f"PDF Summarizer failed: {e}")

try:
    from utils.youtube_converter import YouTubeConverter
    youtube_converter = YouTubeConverter()
    print("YouTube Converter loaded")
except Exception as e:
    youtube_converter = None
    print(f"YouTube Converter failed: {e}")

try:
    from pipeline import run_analysis_pipeline
    print("Pipeline loaded")
except Exception as e:
    run_analysis_pipeline = None
    print(f"Pipeline failed: {e}")

# --- Env & Directory Setup ---
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
CHAT_URL = os.getenv("CHAT_URL", "http://localhost:5000")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

os.makedirs("temp", exist_ok=True)
os.makedirs("static/reports", exist_ok=True)
os.makedirs("static/summaries", exist_ok=True)
os.makedirs("static/transcripts", exist_ok=True)

# --- FastAPI Init ---
app = FastAPI(title="PlacementPro API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with [FRONTEND_URL] in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Static Mounting ---
app.mount("/static", StaticFiles(directory="static"), name="static")
if os.path.exists(".next/static"):
    app.mount("/_next", StaticFiles(directory=".next"), name="nextjs")
if os.path.exists("public"):
    app.mount("/public", StaticFiles(directory="public"), name="public")

# --- Pydantic Models ---
class ATSRequest(BaseModel):
    resume_text: str
    job_description: str

class JobSearchRequest(BaseModel):
    keyword: str = "developer"
    location: str = "bangalore"
    experience: str = ""
    job_type: str = ""
    page: int = 1
    limit: int = 20

class YouTubeRequest(BaseModel):
    url: str
    language: str = "en"

class AnalysisResult(BaseModel):
    transcript: str
    speech_score: int
    body_language_score: int
    total_score: int
    feedback: str
    pdf_url: str

# --- Utility ---
def extract_text_from_pdf(file: UploadFile) -> str:
    try:
        reader = PdfReader(file.file)
        return "\n".join([page.extract_text() or "" for page in reader.pages])
    except Exception as e:
        return f"Error reading PDF: {e}"

# --- Routes ---
@app.get("/")
async def root():
    return {
        "message": "PlacementPro Backend API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/api/health",
            "docs": "/docs"
        },
        "services": {
            "frontend": FRONTEND_URL,
            "chat": CHAT_URL,
            "backend": BACKEND_URL
        }
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "services": {
            "ats_calculator": "active" if ats_calculator else "disabled",
            "job_scraper": "active" if job_scraper else "disabled",
            "pdf_summarizer": "active" if pdf_summarizer else "disabled",
            "youtube_converter": "active" if youtube_converter else "disabled"
        }
    }

@app.get("/chat", response_class=HTMLResponse)
async def proxy_chat():
    try:
        import requests
        response = requests.get(CHAT_URL, timeout=5)
        return HTMLResponse(content=response.text)
    except Exception:
        return HTMLResponse(content=f"""
        <html>
            <body style=\"font-family: Arial; text-align: center; padding: 50px;\">
                <h1>Chat Server Starting...</h1>
                <p>The chat server is initializing. Please wait...</p>
                <p><a href=\"{CHAT_URL}\">Direct Chat Link</a></p>
                <script>setTimeout(() => window.location.reload(), 5000);</script>
            </body>
        </html>
        """)

@app.post("/score-resume/")
async def score_resume(resume: UploadFile, job_description: str = Form(...)):
    if resume.content_type != "application/pdf":
        return JSONResponse(status_code=400, content={"error": "Only PDF resumes are accepted."})
    resume_text = extract_text_from_pdf(resume)
    if "Error" in resume_text:
        return JSONResponse(status_code=500, content={"error": resume_text})
    result = ats_calculator.calculate_ats_score(resume_text, job_description)
    return result

@app.post("/ats/score")
async def ats_score(request: ATSRequest):
    if not ats_calculator:
        raise HTTPException(status_code=503, detail="ATS Calculator unavailable")
    return ats_calculator.calculate_ats_score(request.resume_text, request.job_description)

@app.post("/api/analyze")
async def analyze_video_return_pdf(file: UploadFile = File(...)):
    try:
        os.makedirs("temp", exist_ok=True)
        os.makedirs("static/reports", exist_ok=True)

        filename = Path(file.filename).name
        file_path = os.path.join("temp", filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        transcript = await transcribe_audio(file_path)
        speech_score = await analyze_speech(file_path)
        body_language_score = await analyze_body_language(file_path)
        feedback = await generate_feedback(transcript, speech_score, body_language_score)

        pdf_filename = filename.rsplit(".", 1)[0] + "_report.pdf"
        pdf_path = os.path.join("static/reports", pdf_filename)

        await generate_pdf_report(
            transcript,
            speech_score,
            body_language_score,
            feedback,
            pdf_path
        )

        return FileResponse(
            path=pdf_path,
            media_type="application/pdf",
            filename="analysis_report.pdf"
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

@app.post("/api/youtube-transcript")
async def youtube_transcript_api(request: YouTubeRequest):
    if not youtube_converter:
        raise HTTPException(status_code=503, detail="YouTube Converter unavailable")
    try:
        result = youtube_converter.youtube_to_transcript(request.url)
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])
        return {
            "success": True,
            "title": result["video_info"]["title"],
            "duration": result["video_info"]["duration"],
            "language": result["transcript"]["language"],
            "pdf_url": result["pdf_url"],
            "transcript": result["transcript"]["text"]
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/api/youtube-transcript")
async def get_youtube_transcript(url: str = Query(...)):
    if not youtube_converter:
        raise HTTPException(status_code=503, detail="YouTube Converter unavailable")
    try:
        result = youtube_converter.youtube_to_transcript(url)
        if not result["success"]:
            return JSONResponse(status_code=500, content={"error": result["error"]})
        return {
            "success": True,
            "title": result["video_info"]["title"],
            "duration": result["video_info"]["duration"],
            "language": result["transcript"]["language"],
            "pdf_url": result["pdf_url"],
            "transcript": result["transcript"]["text"]
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/api/summarize-pdf")
async def summarize_pdf(file: UploadFile = File(...)):
    try:
        temp_dir = "temp_uploads"
        os.makedirs(temp_dir, exist_ok=True)
        temp_path = os.path.join(temp_dir, file.filename)
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        result = pdf_summarizer.summarize_pdf(temp_path)
        return result
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/{path:path}")
async def catch_all(path: str):
    if path.startswith(("api/", "static/", "_next/", "public/")):
        raise HTTPException(status_code=404, detail="Not found")
    next_file = f".next/server/pages/{path}.html"
    if os.path.exists(next_file):
        return FileResponse(next_file)
    index_file = ".next/server/pages/index.html"
    if os.path.exists(index_file):
        return FileResponse(index_file)
    raise HTTPException(status_code=404, detail="Page not found")

# --- Dev Server Starter ---
def start_nextjs_server():
    if os.path.exists("package.json"):
        npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
        process = subprocess.Popen([npm_cmd, "start"], cwd=os.getcwd())
        print("Next.js server started")
        return process

def start_chat_server():
    python_exec = sys.executable
    process = subprocess.Popen([python_exec, "chat_server.py"], env=os.environ)
    print("Chat server started")
    return process

if __name__ == "__main__":
    print("Starting PlacementPro backend...")

    if os.getenv("IN_DOCKER") != "true":
        chat_proc = start_chat_server()
        next_proc = start_nextjs_server()

        import atexit
        atexit.register(lambda: chat_proc.terminate() if chat_proc else None)
        atexit.register(lambda: next_proc.terminate() if next_proc else None)

    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=os.getenv("RELOAD", "false") == "true")
