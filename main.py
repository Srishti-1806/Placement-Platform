from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from pathlib import Path
import os
import shutil

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

# Routes
@app.get("/")
async def root():
    return {"message": "PlacementPro API is running successfully! 🚀"}

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

# Start server
if __name__ == "__main__":
    print("🚀 Starting PlacementPro API server...")
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"📍 Server will be available at: http://{host}:{port}")
    print(f"📖 API Documentation: http://{host}:{port}/docs")
    uvicorn.run(app, host=host, port=port, reload=False)
