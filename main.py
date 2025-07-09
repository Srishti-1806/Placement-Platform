from fastapi import FastAPI, HTTPException, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from pathlib import Path
import os
import shutil
import subprocess
import asyncio
import threading
import time
import sys

# Dynamic URLs from environment or defaults
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
CHAT_URL = os.getenv("CHAT_URL", "http://localhost:5000")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

# Create directories first
os.makedirs("temp", exist_ok=True)
os.makedirs("static/reports", exist_ok=True)
os.makedirs("static/summaries", exist_ok=True)
os.makedirs("static/transcripts", exist_ok=True)

# Safe imports with error handling
transcribe_audio = None
analyze_body_language = None
analyze_speech = None
generate_feedback = None
generate_pdf_report = None
record_from_webcam = None

try:
    from utils.transcriber import transcribe_audio
    print("Transcriber loaded")
except Exception as e:
    print(f"Transcriber failed: {e}")

try:
    from utils.body_language import analyze_body_language
    print("Body language analyzer loaded")
except Exception as e:
    print(f"Body language analyzer failed: {e}")

try:
    from utils.speech_analysis import analyze_speech
    print("Speech analyzer loaded")
except Exception as e:
    print(f"Speech analyzer failed: {e}")

try:
    from utils.feedback_generator import generate_feedback
    print("Feedback generator loaded")
except Exception as e:
    print(f"Feedback generator failed: {e}")

try:
    from utils.report_generator import generate_pdf_report
    print("Report generator loaded")
except Exception as e:
    print(f"Report generator failed: {e}")

try:
    from webcam_recorder import record_from_webcam
    print("Webcam recorder loaded")
except Exception as e:
    print(f"Webcam recorder failed: {e}")

try:
    from utils.ats_calculator import ATSCalculator
    ats_calculator = ATSCalculator()
    print("ATS Calculator loaded")
except Exception as e:
    print(f"ATS Calculator failed: {e}")
    ats_calculator = None

try:
    from utils.job_scraper import JobScraper
    job_scraper = JobScraper()
    print("Job Scraper loaded")
except Exception as e:
    print(f"Job Scraper failed: {e}")
    job_scraper = None

try:
    from utils.pdf_summarizer import PDFSummarizer
    pdf_summarizer = PDFSummarizer()
    print("PDF Summarizer loaded")
except Exception as e:
    print(f"PDF Summarizer failed: {e}")
    pdf_summarizer = None

try:
    from utils.youtube_converter import YouTubeConverter
    youtube_converter = YouTubeConverter()
    print("YouTube Converter loaded")
except Exception as e:
    print(f"YouTube Converter failed: {e}")
    youtube_converter = None

# Create FastAPI app
print("Creating FastAPI app...")
app = FastAPI(title="PlacementPro API", version="1.0.0")
print("FastAPI app created successfully")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Add CORS middleware (restrict for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],  # Only allow your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Next.js static files if they exist
if os.path.exists(".next/static"):
    app.mount("/_next", StaticFiles(directory=".next"), name="nextjs")
    print("Next.js static files mounted")

if os.path.exists("public"):
    app.mount("/public", StaticFiles(directory="public"), name="public")
    print("Public files mounted")

# Pydantic models
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

def start_nextjs_server():
    """Start Next.js server in a separate thread"""
    if os.path.exists("package.json"):
        try:
            print("Starting Next.js server...")
            npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
            cwd = os.path.abspath(os.path.dirname(__file__))
            process = subprocess.Popen(
                [npm_cmd, "start"],
                cwd=cwd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            print("Next.js server started on port 3000")
            return process
        except Exception as e:
            print(f"Failed to start Next.js: {e}")
            return None
    return None

def start_chat_server():
    """Start chat server in a separate thread"""
    try:
        print("Starting chat server...")
        python_exec = sys.executable if os.name == "nt" else "/app/chat_venv/bin/python"
        process = subprocess.Popen(
            [python_exec, "chat_server.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env={**os.environ, "PORT": "5000", "HOST": "0.0.0.0"}
        )
        time.sleep(2)
        if process.poll() is None:
            print("Chat server started on port 5000")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"Chat server failed to start: {stderr.decode(errors='ignore')}")
            return None
    except Exception as e:
        print(f"Failed to start chat server: {e}")
        return None

@app.get("/")
async def serve_homepage():
    """Simple API endpoint - no HTML redirect"""
    return {
        "message": "PlacementPro Backend API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/api/health",
            "docs": "/docs",
            "redoc": "/redoc"
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
    """Proxy to chat server"""
    try:
        import requests
        response = requests.get(CHAT_URL, timeout=5)
        return HTMLResponse(content=response.text)
    except Exception as e:
        return HTMLResponse(content=f"""
        <html>
            <body style="font-family: Arial; text-align: center; padding: 50px;">
                <h1>Chat Server Starting...</h1>
                <p>The chat server is initializing. Please wait...</p>
                <p><a href="{CHAT_URL}">Direct Chat Link</a></p>
                <script>setTimeout(() => window.location.reload(), 5000);</script>
            </body>
        </html>
        """)



@app.post("/api/youtube-transcript")
async def youtube_transcript(request: Request):
    try:
        data = await request.json()
        url = data.get("url")
        print(f"Received YouTube URL: {url}")
        if not url:
            print("Missing YouTube URL in request")
            raise HTTPException(status_code=400, detail="Missing YouTube URL")
        if not youtube_converter:
            print("YouTube converter not available")
            raise HTTPException(status_code=500, detail="YouTube converter not available")
        result = youtube_converter.get_transcript(url)
        print(f"Transcription result: {result}")
        return result
    except Exception as e:
        print(f"Error in /youtube-transcript: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/{path:path}")
async def catch_all(path: str):
    # Don't interfere with API routes
    if path.startswith("api/") or path.startswith("static/") or path.startswith("_next/"):
        raise HTTPException(status_code=404, detail="Not found")
    next_file = f".next/server/pages/{path}.html"
    if os.path.exists(next_file):
        return FileResponse(next_file)
    if os.path.exists(".next/server/pages/index.html"):
        return FileResponse(".next/server/pages/index.html")
    raise HTTPException(status_code=404, detail="Page not found")

if __name__ == "__main__":
    print("Starting PlacementPro...")
    
    # Only start these processes if not running in Docker/Supervisor
    if os.getenv("IN_DOCKER") != "true":
        chat_process = start_chat_server()
        nextjs_process = start_nextjs_server()
        
        import atexit
        def cleanup():
            if chat_process:
                chat_process.terminate()
            if nextjs_process:
                nextjs_process.terminate()
        atexit.register(cleanup)
    
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"FastAPI Backend: {BACKEND_URL}")
    print(f"Next.js Frontend: {FRONTEND_URL} (if available)")
    print(f"Chat Server: {CHAT_URL}")
    uvicorn.run(app, host=host, port=port, reload=False)
