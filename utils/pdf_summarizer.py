import PyPDF2
from transformers import pipeline
import os
import tempfile

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    pdf_text = ""
    try:
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                pdf_text += page.extract_text() + "\n"
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")
    return pdf_text

def summarize_text(text, max_chunk=1000):
    """Summarize text using transformers pipeline"""
    try:
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        summary = ""
        
        # Split text into chunks
        for i in range(0, len(text), max_chunk):
            chunk = text[i:i+max_chunk]
            if len(chunk.strip()) < 50:  # Skip very short chunks
                continue
                
            summary_piece = summarizer(
                chunk, 
                max_length=150, 
                min_length=40, 
                do_sample=False
            )[0]['summary_text']
            summary += summary_piece + "\n\n"
            
    except Exception as e:
        raise Exception(f"Error summarizing text: {str(e)}")
    
    return summary.strip()

def summarize_pdf(pdf_path):
    """Main function to summarize PDF"""
    print("Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_path)
    
    if not text.strip():
        raise Exception("No text found in PDF")
    
    print("Summarizing text...")
    summary = summarize_text(text)
    
    return {
        "original_text": text,
        "summary": summary,
        "word_count_original": len(text.split()),
        "word_count_summary": len(summary.split())
    }

def generate_summary_pdf(original_text, summary, output_path):
    """Generate a PDF report with original and summarized text"""
    from fpdf import FPDF
    
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    # Title
    pdf.set_font("Arial", 'B', size=16)
    pdf.cell(200, 10, txt="PDF Summary Report", ln=True, align='C')
    pdf.ln(10)
    
    # Summary section
    pdf.set_font("Arial", 'B', size=14)
    pdf.cell(0, 10, txt="Summary:", ln=True)
    pdf.set_font("Arial", size=11)
    pdf.multi_cell(0, 8, txt=summary)
    pdf.ln(5)
    
    # Statistics
    pdf.set_font("Arial", 'B', size=12)
    pdf.cell(0, 10, txt="Statistics:", ln=True)
    pdf.set_font("Arial", size=10)
    pdf.cell(0, 8, txt=f"Original word count: {len(original_text.split())}", ln=True)
    pdf.cell(0, 8, txt=f"Summary word count: {len(summary.split())}", ln=True)
    pdf.cell(0, 8, txt=f"Compression ratio: {len(summary.split())/len(original_text.split())*100:.1f}%", ln=True)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    return output_path
