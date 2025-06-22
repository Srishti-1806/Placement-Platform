from utils.transcriber import transcribe_audio
from utils.body_language import analyze_body_language
from utils.speech_analysis import analyze_speech
from utils.feedback_generator import generate_feedback
from utils.report_generator import generate_pdf_report

def run_analysis_pipeline(video_path: str) -> str:
    transcript = transcribe_audio(video_path)
    speech_score = analyze_speech(video_path)
    body_score = analyze_body_language(video_path)
    feedback = generate_feedback(transcript, speech_score, body_score)

    output_path = "static/reports/analysis_report.pdf"
    generate_pdf_report(transcript, speech_score, body_score, feedback, output_path)

    return output_path