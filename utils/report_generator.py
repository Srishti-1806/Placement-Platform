from fpdf import FPDF
import os

def generate_pdf_report(transcript: str, speech_score: int, body_score: int, feedback: str, output_path: str) -> str:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.set_text_color(0, 0, 0)
    pdf.set_fill_color(240, 240, 240)

    pdf.set_font("Arial", 'B', size=16)
    pdf.cell(200, 10, txt="Speech & Body Language Analysis Report", ln=True, align='C')
    pdf.ln(10)

    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, txt=f"Transcript:\n{transcript}")
    pdf.ln(5)

    pdf.cell(0, 10, txt=f"Speech Score: {speech_score}/100", ln=True)
    pdf.cell(0, 10, txt=f"Body Language Score: {body_score}/100", ln=True)
    pdf.ln(5)

    pdf.multi_cell(0, 10, txt=f"LLM Feedback:\n{feedback}")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    return output_path
