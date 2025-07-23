import os
import fitz  # PyMuPDF
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from tempfile import NamedTemporaryFile
from dotenv import load_dotenv

from langchain.text_splitter import CharacterTextSplitter
from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain.chains.summarize import load_summarize_chain

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable not set")

llm = ChatGroq(
    groq_api_key=GROQ_API_KEY,
    model_name="llama3-8b-8192"
)

app = FastAPI()

SUMMARY_PROMPT = PromptTemplate.from_template("""
Summarize the following content clearly and concisely:

"{text}"

Summary:
""")

def PDFSummarizer(file: UploadFile) -> str:
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    # Save uploaded PDF temporarily
    with NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name

    try:
        # Extract text from PDF using PyMuPDF
        text = ""
        with fitz.open(tmp_path) as doc:
            for page in doc:
                text += page.get_text()

        if not text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in PDF.")

        # Split large text into chunks
        splitter = CharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=1500,
            chunk_overlap=200
        )
        docs = splitter.create_documents([text])

        # Create summarization chain
        chain = load_summarize_chain(
            llm=llm,
            chain_type="map_reduce",
            map_prompt=SUMMARY_PROMPT,
            combine_prompt=SUMMARY_PROMPT
        )

        summary = chain.run(docs)
        return summary.strip()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        os.remove(tmp_path)
