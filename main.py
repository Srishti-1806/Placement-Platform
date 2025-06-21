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
    """Calculate ATS score between resume and job description"""
    try:
        print(f"📊 Calculating ATS score...")
        print(f"📝 Resume length: {len(request.resume_text)} characters")
        print(f"💼 Job description length: {len(request.job_description)} characters")
        
        result = ats_calculator.calculate_ats_score(
            request.resume_text, 
            request.job_description
        )
        
        print(f"✅ ATS Score calculated: {result.get('overall_score', 0)}%")
        return result
        
    except Exception as e:
        print(f"❌ ATS calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"ATS calculation failed: {str(e)}")

@app.post("/api/jobs")
async def search_jobs(request: JobSearchRequest):
    """Search and scrape jobs from various sources"""
    try:
        jobs = job_scraper.search_jobs(
            keyword=request.keyword,
            location=request.location,
            experience=request.experience,
            job_type=request.job_type
        )
        
        # Pagination
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
    """Convert YouTube video to transcript"""
    try:
        result = youtube_converter.youtube_to_transcript(request.url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"YouTube conversion failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "services": {
            "ats_calculator": "active",
            "job_scraper": "active",
            "pdf_summarizer": "active",
            "youtube_converter": "active"
        }
    }

if __name__ == "__main__":
    print("🚀 Starting PlacementPro API Server...")
    print("📊 ATS Calculator: Ready")
    print("💼 Job Scraper: Ready")
    print("📄 PDF Summarizer: Ready")
    print("🎥 YouTube Converter: Ready")
    print("🌐 Server running on: http://localhost:8000")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
