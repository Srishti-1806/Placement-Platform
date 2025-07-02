from fastapi import FastAPI, HTTPException, File, UploadFile
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

# Load utilities safely
try:
    from utils.transcriber import transcribe_audio
    print("✅ Transcriber loaded")
except Exception as e:
    print(f"❌ Transcriber failed: {e}")

try:
    from utils.body_language import analyze_body_language
    print("✅ Body language analyzer loaded")
except Exception as e:
    print(f"❌ Body language analyzer failed: {e}")

try:
    from utils.speech_analysis import analyze_speech
    print("✅ Speech analyzer loaded")
except Exception as e:
    print(f"❌ Speech analyzer failed: {e}")

try:
    from utils.feedback_generator import generate_feedback
    print("✅ Feedback generator loaded")
except Exception as e:
    print(f"❌ Feedback generator failed: {e}")

try:
    from utils.report_generator import generate_pdf_report
    print("✅ Report generator loaded")
except Exception as e:
    print(f"❌ Report generator failed: {e}")

try:
    from webcam_recorder import record_from_webcam
    print("✅ Webcam recorder loaded")
except Exception as e:
    print(f"❌ Webcam recorder failed: {e}")

try:
    from utils.ats_calculator import ATSCalculator
    ats_calculator = ATSCalculator()
    print("✅ ATS Calculator loaded")
except Exception as e:
    print(f"❌ ATS Calculator failed: {e}")
    ats_calculator = None

try:
    from utils.job_scraper import JobScraper
    job_scraper = JobScraper()
    print("✅ Job Scraper loaded")
except Exception as e:
    print(f"❌ Job Scraper failed: {e}")
    job_scraper = None

try:
    from utils.pdf_summarizer import PDFSummarizer
    pdf_summarizer = PDFSummarizer()
    print("✅ PDF Summarizer loaded")
except Exception as e:
    print(f"❌ PDF Summarizer failed: {e}")
    pdf_summarizer = None

try:
    from utils.youtube_converter import YouTubeConverter
    youtube_converter = YouTubeConverter()
    print("✅ YouTube Converter loaded")
except Exception as e:
    print(f"❌ YouTube Converter failed: {e}")
    youtube_converter = None

# Create FastAPI app (ONLY ONCE!)
print("🔍 Creating FastAPI app...")
app = FastAPI(title="PlacementPro API", version="1.0.0")
print("✅ FastAPI app created successfully")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to start Next.js (add this after your app creation)
async def start_nextjs_if_available():
    """Start Next.js frontend if package.json exists"""
    if os.path.exists("package.json"):
        try:
            # Start Next.js in background
            process = subprocess.Popen(
                ["npm", "run", "start"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            print("✅ Next.js frontend started successfully")
            return process
        except Exception as e:
            print(f"❌ Next.js start failed: {e}")
            return None
    return None

# Mount Next.js static files if they exist (add after your static mount)
if os.path.exists(".next/static"):
    app.mount("/_next", StaticFiles(directory=".next"), name="nextjs")
    print("✅ Next.js static files mounted")

if os.path.exists("public"):
    app.mount("/public", StaticFiles(directory="public"), name="public")
    print("✅ Public files mounted")

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


# Add this function after your app creation
def start_nextjs_server():
    """Start Next.js server in a separate thread"""
    if os.path.exists("package.json"):
        try:
            print("🎨 Starting Next.js server...")
            # Start Next.js server
            process = subprocess.Popen(
                ["npm", "start"], 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                cwd="/app"
            )
            print("✅ Next.js server started on port 3000")
            return process
        except Exception as e:
            print(f"❌ Failed to start Next.js: {e}")
            return None
    return None

# Add chat server startup to your main.py
def start_chat_server():
    """Start chat server in a separate thread"""
    try:
        print("💬 Starting chat server...")
        process = subprocess.Popen(
            ["python", "chat_server.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        print("✅ Chat server started on port 5000")
        return process
    except Exception as e:
        print(f"❌ Failed to start chat server: {e}")
        return None

# Routes
@app.get("/")
async def serve_frontend():
    # Try to serve Next.js build
    if os.path.exists("static/frontend/server/pages/index.html"):
        return FileResponse("static/frontend/server/pages/index.html")
    elif os.path.exists(".next/server/pages/index.html"):
        return FileResponse(".next/server/pages/index.html")
    else:
        # Fallback response
        return HTMLResponse("""
        <!DOCTYPE html>
        <html>
        <head>
            <title>PlacementPro</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f0f0; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
                .status { color: #4CAF50; font-weight: bold; }
                .error { color: #f44336; }
                a { color: #2196F3; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 PlacementPro</h1>
                <p>Your AI-Powered Career Assistant Platform</p>
                <p class="status">✅ Backend API is running successfully!</p>
                <p class="error">⚠️ Frontend build not found. Next.js frontend will be available at port 3000 when ready.</p>
                <div style="margin: 20px 0;">
                    <a href="/api/health">🏥 Health Check</a> | 
                    <a href="/docs">📖 API Documentation</a>
                </div>
                <p><small>Backend: Port 8000 | Frontend: Port 3000</small></p>
            </div>
        </body>
        </html>
        """)

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

@app.post("/api/ats-calculator")
async def calculate_ats_score(request: ATSRequest):
    if not ats_calculator:
        raise HTTPException(status_code=503, detail="ATS Calculator service not available")
    
    try:
        result = ats_calculator.calculate_ats_score(
            request.resume_text,
            request.job_description
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ATS calculation failed: {str(e)}")

@app.post("/api/jobs")
async def search_jobs(request: JobSearchRequest):
    if not job_scraper:
        raise HTTPException(status_code=503, detail="Job Scraper service not available")
    
    try:
        # Use the correct method name
        jobs = job_scraper.scrape_naukri_jobs(
            keyword=request.keyword,
            location=request.location,
            pages=2
        )
        
        start_idx = (request.page - 1) * request.limit
        end_idx = start_idx + request.limit
        paginated_jobs = jobs[start_idx:end_idx]
        
        return {
            "jobs": paginated_jobs,
            "total": len(jobs),
            "page": request.page,
            "limit": request.limit,
            "total_pages": (len(jobs) + request.limit - 1) // request.limit
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Job search failed: {str(e)}")

@app.post("/api/summarize-pdf")
async def summarize_pdf(file: UploadFile = File(...)):
    if not pdf_summarizer:
        raise HTTPException(status_code=503, detail="PDF Summarizer service not available")
    
    try:
        file_location = f"temp/{file.filename}"
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        result = pdf_summarizer.summarize_pdf(file_location)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF summarization failed: {str(e)}")

@app.post("/api/youtube-transcript")
async def convert_youtube(request: YouTubeRequest):
    if not youtube_converter:
        raise HTTPException(status_code=503, detail="YouTube Converter service not available")
    
    try:
        result = youtube_converter.youtube_to_transcript(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"YouTube conversion failed: {str(e)}")

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_video(file: UploadFile = File(...)):
    if not all([transcribe_audio, analyze_speech, analyze_body_language, generate_feedback, generate_pdf_report]):
        raise HTTPException(status_code=503, detail="Video analysis services not fully available")
    
    try:
        filename = Path(file.filename).name
        file_path = f"temp/{filename}"
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        transcript = transcribe_audio(file_path)
        speech_score = analyze_speech(file_path)
        body_language_score = analyze_body_language(file_path)
        feedback = generate_feedback(transcript, speech_score, body_language_score)

        pdf_filename = filename.replace(".mp4", "_report.pdf")
        pdf_path = f"static/reports/{pdf_filename}"
        generate_pdf_report(transcript, speech_score, body_language_score, feedback, pdf_path)

        return AnalysisResult(
            transcript=transcript,
            speech_score=speech_score,
            body_language_score=body_language_score,
            total_score=speech_score + body_language_score,
            feedback=feedback,
            pdf_url=f"/static/reports/{pdf_filename}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Video analysis failed: {str(e)}")

@app.get("/record-webcam", response_model=AnalysisResult)
def record_and_analyze():
    if not record_from_webcam:
        raise HTTPException(status_code=503, detail="Webcam recording not available")
    
    try:
        video_path = "temp/webcam_recording.mp4"
        record_from_webcam(video_path)

        transcript = transcribe_audio(video_path)
        speech_score = analyze_speech(video_path)
        body_language_score = analyze_body_language(video_path)
        feedback = generate_feedback(transcript, speech_score, body_language_score)

        pdf_filename = "webcam_recording_report.pdf"
        pdf_path = f"static/reports/{pdf_filename}"
        generate_pdf_report(transcript, speech_score, body_language_score, feedback, pdf_path)

        return AnalysisResult(
            transcript=transcript,
            speech_score=speech_score,
            body_language_score=body_language_score,
            total_score=speech_score + body_language_score,
            feedback=feedback,
            pdf_url=f"/static/reports/{pdf_filename}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Webcam recording failed: {str(e)}")

# Serve frontend at root
@app.get("/", response_class=HTMLResponse)
async def serve_homepage():
    """Serve Next.js frontend"""
    try:
        # Try to serve from Next.js build
        frontend_path = Path(".next/server/pages/index.html")
        if frontend_path.exists():
            with open(frontend_path, "r") as f:
                return HTMLResponse(content=f.read())
        else:
            # Fallback to a landing page that redirects to frontend port
            return HTMLResponse(content=f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>PlacementPro - Loading...</title>
                <style>
                    body {{ 
                        font-family: Arial, sans-serif; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        text-align: center; 
                        padding: 50px; 
                        margin: 0;
                    }}
                    .container {{ 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding: 40px; 
                        background: rgba(255,255,255,0.1); 
                        border-radius: 15px; 
                        backdrop-filter: blur(10px);
                    }}
                    .loading {{ animation: pulse 2s infinite; }}
                    @keyframes pulse {{ 0%, 100% {{ opacity: 1; }} 50% {{ opacity: 0.5; }} }}
                    .status {{ margin: 20px 0; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px; }}
                    .success {{ color: #10b981; }}
                    .error {{ color: #ef4444; }}
                    a {{ color: #67e8f9; text-decoration: none; margin: 0 10px; }}
                </style>
                <script>
                    let attempts = 0;
                    const maxAttempts = 20;
                    
                    function checkFrontend() {{
                        attempts++;
                        fetch('http://51.21.252.8:3000')
                            .then(response => {{
                                if (response.ok) {{
                                    window.location.href = 'http://51.21.252.8:3000';
                                }} else {{
                                    throw new Error('Frontend not ready');
                                }}
                            }})
                            .catch(error => {{
                                if (attempts < maxAttempts) {{
                                    document.getElementById('status').innerHTML = 
                                        `<div class="loading">🔄 Loading frontend... (Attempt ${{attempts}}/${{maxAttempts}})</div>`;
                                    setTimeout(checkFrontend, 3000);
                                }} else {{
                                    document.getElementById('status').innerHTML = 
                                        `<div class="error">❌ Frontend failed to load. <a href="http://51.21.252.8:3000">Try directly</a></div>`;
                                }}
                            }});
                    }}
                    
                    // Start checking after 5 seconds
                    setTimeout(checkFrontend, 5000);
                </script>
            </head>
            <body>
                <div class="container">
                    <h1>🚀 PlacementPro</h1>
                    <h2>Your AI-Powered Career Assistant Platform</h2>
                    <div id="status" class="status loading">
                        ⏳ Starting all services...
                    </div>
                    <div class="status">
                        <div class="success">✅ Backend API: Running</div>
                        <div>🎨 Frontend: Loading...</div>
                        <div>💬 Chat Server: Starting...</div>
                    </div>
                    <div>
                        <a href="http://51.21.252.8:3000">🎨 Frontend</a>
                        <a href="http://51.21.252.8:8000/docs">📖 API Docs</a>
                        <a href="http://51.21.252.8:5000">💬 Chat</a>
                        <a href="http://51.21.252.8:8000/api/health">🏥 Health Check</a>
                    </div>
                </div>
            </body>
            </html>
            """)
    except Exception as e:
        return {"message": "PlacementPro API is running successfully! 🚀", "error": str(e)}

# Add chat proxy route
@app.get("/chat", response_class=HTMLResponse)
async def proxy_chat():
    """Proxy to chat server"""
    try:
        import requests
        response = requests.get("http://localhost:5000", timeout=5)
        return HTMLResponse(content=response.text)
    except Exception as e:
        return HTMLResponse(content=f"""
        <html>
            <body style="font-family: Arial; text-align: center; padding: 50px;">
                <h1>💬 Chat Server Starting...</h1>
                <p>The chat server is initializing. Please wait...</p>
                <p><a href="http://51.21.252.8:5000">Direct Chat Link</a></p>
                <script>setTimeout(() => window.location.reload(), 5000);</script>
            </body>
        </html>
        """)

# Catch-all for Next.js routing (add at the end, before the if __name__ == "__main__": block)
@app.get("/{path:path}")
async def catch_all(path: str):
    # Don't interfere with API routes
    if path.startswith("api/") or path.startswith("static/") or path.startswith("_next/"):
        raise HTTPException(status_code=404, detail="Not found")
    
    # Try to serve Next.js page
    next_file = f".next/server/pages/{path}.html"
    if os.path.exists(next_file):
        return FileResponse(next_file)
    
    # Fallback to index
    if os.path.exists(".next/server/pages/index.html"):
        return FileResponse(".next/server/pages/index.html")
    
    raise HTTPException(status_code=404, detail="Page not found")

# Update your startup (REPLACE the if __name__ == "__main__": block)
if __name__ == "__main__":
    print("🚀 Starting PlacementPro...")
    
    # Start chat server
    chat_thread = threading.Thread(target=start_chat_server)
    chat_thread.daemon = True
    chat_thread.start()
    
    # Start Next.js in background thread
    nextjs_thread = threading.Thread(target=start_nextjs_server)
    nextjs_thread.daemon = True
    nextjs_thread.start()
    
    # Wait a moment for services to start
    time.sleep(5)
    
    # Start FastAPI
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"🔧 FastAPI Backend: http://{host}:{port}")
    print(f"🎨 Next.js Frontend: http://{host}:3000 (if available)")
    print(f"💬 Chat Server: http://{host}:5000")
    
    uvicorn.run(app, host=host, port=port, reload=False)
