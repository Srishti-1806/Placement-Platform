import PyPDF2
from transformers import pipeline
import os
import re

def sanitize_ascii(text):
    # Replace smart quotes and dashes with ASCII equivalents
    text = text.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
    text = text.replace("–", "-").replace("—", "-")
    # Remove any remaining non-ASCII characters
    return re.sub(r"[^\x00-\x7F]+", "", text)

class PDFSummarizer:
    def extract_text_from_pdf(self, pdf_path):
        """Extract text from PDF file"""
        pdf_text = ""
        try:
            with open(pdf_path, "rb") as file:
                reader = PyPDF2.PdfReader(file)
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        pdf_text += page_text + "\n"
        except Exception as e:
            raise Exception(f"Error extracting text from PDF: {str(e)}")
        return pdf_text

    def summarize_text(self, text, max_chunk=1000):
        """Summarize text using transformers pipeline"""
        try:
            summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
            summary = ""
            for i in range(0, len(text), max_chunk):
                chunk = text[i:i+max_chunk]
                if len(chunk.strip()) < 50:
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

    def summarize_pdf(self, pdf_path):
        """Main function to summarize PDF"""
        print("Extracting text from PDF...")
        text = self.extract_text_from_pdf(pdf_path)
        if not text.strip():
            raise Exception("No text found in PDF")
        print("Summarizing text...")
        summary = self.summarize_text(text)
        pdf_path = self.generate_summary_pdf(text, summary)
        return {
            "original_text": text,
            "summary": summary,
            "word_count_original": len(text.split()),
            "word_count_summary": len(summary.split()),
            "compressed_ratio": len(summary.split())/len(text.split())*100,
            "pdf_path": "/pdfs/summary.pdf"
        }

    def generate_summary_pdf(self, original_text, summary):
        """Generate a PDF report with original and summarized text"""
        from fpdf import FPDF, XPos, YPos

        # Sanitize all text to ASCII
        original_text = sanitize_ascii(original_text)
        summary = sanitize_ascii(summary)

        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("helvetica", size=12)

        # Title
        pdf.set_font("helvetica", 'B', size=16)
        pdf.cell(200, 10, text="PDF Summary Report", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        pdf.ln(10)

        # Summary section
        pdf.set_font("helvetica", 'B', size=14)
        pdf.cell(0, 10, text="Summary:", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.set_font("helvetica", size=11)
        pdf.multi_cell(0, 8, text=summary)
        pdf.ln(5)

        # Statistics
        pdf.set_font("helvetica", 'B', size=12)
        pdf.cell(0, 10, text="Statistics:", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.set_font("helvetica", size=10)
        pdf.cell(0, 8, text=f"Original word count: {len(original_text.split())}", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.cell(0, 8, text=f"Summary word count: {len(summary.split())}", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.cell(0, 8, text=f"Compression ratio: {len(summary.split())/len(original_text.split())*100:.1f}%", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        final_path = os.path.join("public", "pdfs", "summary.pdf")
        os.makedirs(os.path.dirname(final_path), exist_ok=True)
        pdf.output(final_path)
        return final_path

if __name__ == "__main__":
    summarizer = PDFSummarizer()
    test_pdf_path = "test.pdf"
    try:
        result = summarizer.summarize_pdf(test_pdf_path)
        print("Summary:\n", result["summary"])
        print("\nStatistics:")
        print(f"Original word count: {result['word_count_original']}")
        print(f"Summary word count: {result['word_count_summary']}")
        print(f"Compression ratio: {result['compressed_ratio']:.1f}%")
        print(f"Summary PDF saved at: {result['pdf_path']}")
    except Exception as e:
        print("Error:", e)