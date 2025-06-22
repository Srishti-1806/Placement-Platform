from fastapi import FastAPI, HTTPException,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# for transcribe pdf static files
from fastapi.staticfiles import StaticFiles 
# for pdf summirizer
import os
import shutil

# Import our utilities
=======
from fastapi import UploadFile, File
from fastapi.responses import JSONResponse
import os
import shutil
from utils.transcriber import transcribe_audio
from utils.body_language import analyze_body_language
from utils.speech_analysis import analyze_speech
from utils.feedback_generator import generate_feedback
from utils.report_generator import generate_pdf_report
from webcam_recorder import record_from_webcam
from pathlib import Path

from utils.ats_calculator import ATSCalculator
from utils.job_scraper import JobScraper
from utils.pdf_summarizer import PDFSummarizer
from utils.youtube_converter import YouTubeConverter

app = FastAPI(title="PlacementPro API", version="1.0.0")
app.mount("/static", StaticFiles(directory="public"), name="static")
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
ats_calculator = ATSCalculator()
job_scraper = JobScraper()
pdf_summarizer = PDFSummarizer()
youtube_converter = YouTubeConverter()

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

class PDFSummaryRequest(BaseModel):
    file_path: str

class YouTubeRequest(BaseModel):
    url: str
    language: str = "en"

@app.get("/")
async def root():
    return {"message": "PlacementPro API is running"}

@app.post("/api/ats-calculator")
async def calculate_ats_score(request: ATSRequest):
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
    try:
        jobs = job_scraper.search_jobs(
            keyword=request.keyword,
            location=request.location,
            experience=request.experience,
            job_type=request.job_type
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
    """Summarize PDF document"""
=======
async def summarize_pdf(request: PDFSummaryRequest):

    try:
        os.makedirs("temp", exist_ok=True)
        file_location = f"temp/{file.filename}"
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        result = pdf_summarizer.summarize_pdf(file_location)
        # print("this is result boi",result)
        return result
    except Exception as e:
        print("error",e)
        raise HTTPException(status_code=500, detail=f"PDF summarization failed: {str(e)}")

@app.post("/api/youtube-transcript")
async def convert_youtube(request: YouTubeRequest):
    try:

        result = youtube_converter.youtube_to_transcript(request.url)
=======
        result = youtube_converter.convert_to_transcript(
            request.url,
            request.language
        )

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"YouTube conversion failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "services": {
            "ats_calculator": "active",
            "job_scraper": "active",
            "pdf_summarizer": "active",
            "youtube_converter": "active"
        }
    }

class AnalysisResult(BaseModel):
    transcript: str
    speech_score: int
    body_language_score: int
    total_score: int
    feedback: str
    pdf_url: str

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_video(file: UploadFile = File(...)):
    os.makedirs("temp", exist_ok=True)
    os.makedirs("static/reports", exist_ok=True)

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

@app.get("/record-webcam", response_model=AnalysisResult)
def record_and_analyze():
    os.makedirs("temp", exist_ok=True)
    os.makedirs("static/reports", exist_ok=True)

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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
