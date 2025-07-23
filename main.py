from fastapi import FastAPI, UploadFile, File, HTTPException, Request, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse, HTMLResponse
from pydantic import BaseModel
from typing import Optional
from pathlib import Path
from PyPDF2 import PdfReader
import os
import fitz  # PyMuPDF
from tempfile import NamedTemporaryFile
from dotenv import load_dotenv
load_dotenv()
from langchain.text_splitter import CharacterTextSplitter
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain.chains.summarize import load_summarize_chain
import shutil
import subprocess
import sys
import uvicorn
app = FastAPI()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable not set")

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

@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_video(file: UploadFile = File(...)):
    print("HELLO ANALYSER")
    os.makedirs("temp", exist_ok=True)
    os.makedirs("static/reports", exist_ok=True)
    # Extract safe filename
    filename = Path(file.filename).name
    file_path = os.path.join("temp", filename)

    # Delete old temp file if it exists
    if os.path.exists(file_path):
        os.remove(file_path)

    print("filename", file_path)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
        try:
            transcript = transcribe_audio(file_path)
            print("✅ Transcript done")
        except Exception as e:
            print("❌ Error in transcribe_audio:", e)
            raise HTTPException(status_code=500, detail=f"transcribe_audio error: {e}")
        try:
            speech_score = analyze_speech(file_path)
            print("✅ Speech analysis done")
        except Exception as e:
            print("❌ Error in analyze_speech:", e)
            raise HTTPException(status_code=500, detail=f"analyze_speech error: {e}")

        try:
            body_language_score = analyze_body_language(file_path)
            print("✅ Body language analysis done")
        except Exception as e:
            print("❌ Error in analyze_body_language:", e)
            raise HTTPException(status_code=500, detail=f"body_language_score error: {e}")

        try:
            feedback = generate_feedback(transcript, speech_score, body_language_score)
            print("✅ Feedback generation done")
        except Exception as e:
            print("❌ Error in generate_feedback:", e)
            raise HTTPException(status_code=500, detail=f"generate_feedback error: {e}")

    try:
        pdf_filename = filename.replace(".mp4", "_report.pdf")
        pdf_path = os.path.join("static", "reports", pdf_filename)
        if os.path.exists(pdf_path):
            os.remove(pdf_path)
        generate_pdf_report(transcript, speech_score, body_language_score, feedback, pdf_path)
        print("✅ PDF generation done")
    except Exception as e:
        print("❌ Error in generate_pdf_report:", e)
    #raise HTTPException(status_code=500, detail=f"generate_pdf_report error: {e}"
    print("This is transcript",transcript,"\n")
    print("This is speech_score",speech_score,"\n")
    print("This is feedback",feedback,"\n")
    print("This is body_language_score",body_language_score,"\n")
    
    return AnalysisResult(
        transcript=transcript,
        speech_score=speech_score,
        body_language_score=body_language_score,
        total_score=speech_score + body_language_score,
        feedback=feedback,
        pdf_url=f"/static/reports/{pdf_filename}"
    )


class YouTubeRequest(BaseModel):
    url: str

@app.post("/api/youtube-transcript")
async def convert_youtube(request: YouTubeRequest):
    print("This is youtube url", request.url)
    if not youtube_converter:
        raise HTTPException(status_code=503, detail="YouTube Converter service not available")
    try:
        result = youtube_converter.youtube_to_transcript(request.url)
        print("This is resulttttt",result)
        return result
    except Exception as e:
        print("This is error block",f"YouTube conversion failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"YouTube conversion failed: {str(e)}")

@app.post("/api/summarize")
async def summarize_pdf(file: UploadFile = File(...)):
    print("Mai function ko hit toh kar raha hu")
    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name="llama3-8b-8192"
    )
    SUMMARY_PROMPT = PromptTemplate.from_template("""
    Summarize the following content clearly and concisely:

    "{text}"

    Summary:
    """)
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    try:
        print("Save uploaded PDF temporarily")
        with NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        
        text = ""
        with fitz.open(tmp_path) as doc:
            print("Extract text from PDF using PyMuPDF")
            for page in doc:
                text += page.get_text()
                print("Extract text from PDF using PyMuPDF, this is text", text)


        os.remove(tmp_path)  # Clean up

        if not text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in PDF.")

        # Split large text into chunks
        splitter = CharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=1500,
            chunk_overlap=200
        )
        docs = splitter.create_documents([text])

        
        chain = load_summarize_chain(
            llm=llm,
            chain_type="map_reduce",
            map_prompt=SUMMARY_PROMPT,
            combine_prompt=SUMMARY_PROMPT
        )
        summary_result = chain.invoke(docs)
        print("Create summarization chain", summary_result)
        return JSONResponse({"summary": summary_result['output_text']})

    except Exception as e:
        print("NOTA", e)
        raise HTTPException(status_code=500, detail=str(e))

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

    uvicorn.run("main:app", port=int(os.getenv("PORT", 8000)), reload=os.getenv("RELOAD", "false") == "true")
