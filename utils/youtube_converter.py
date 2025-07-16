import os
import tempfile
import traceback
from pytube import YouTube
import whisper
from fpdf import FPDF
from datetime import timedelta

class YouTubeConverter:
    def __init__(self):
        try:
            self.model = whisper.load_model("base")
        except Exception as e:
            print("Failed to load Whisper model:", str(e))
            raise

        self.output_dir = "static/transcripts"
        os.makedirs(self.output_dir, exist_ok=True)

    def youtube_to_transcript(self, url: str):
        try:
            print(f"[INFO] Processing YouTube URL: {url}")
            yt = YouTube(url)

            audio_stream = yt.streams.filter(only_audio=True).first()
            if not audio_stream:
                return {"success": False, "error": "No audio stream found for this video."}

            title = yt.title.replace(" ", "_").replace("/", "_").replace("\\", "_")
            duration = str(timedelta(seconds=int(yt.length)))

            # Download audio to temp file
            with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as tmp_file:
                audio_path = tmp_file.name
            print(f"[INFO] Downloading audio to: {audio_path}")
            audio_stream.download(filename=audio_path)

            # Transcribe audio using Whisper
            print("[INFO] Starting transcription...")
            result = self.model.transcribe(audio_path)
            transcript_text = result.get("text", "")
            language = result.get("language", "unknown")

            if not transcript_text:
                raise ValueError("Transcription failed or returned empty result.")

            # Generate PDF
            print("[INFO] Generating PDF...")
            pdf = FPDF()
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            pdf.multi_cell(0, 10, f"Title: {yt.title}\nDuration: {duration}\nLanguage: {language}\n\nTranscript:\n{transcript_text}")

            pdf_filename = f"{title}_transcript.pdf"
            pdf_path = os.path.join(self.output_dir, pdf_filename)
            pdf.output(pdf_path)

            # Cleanup
            if os.path.exists(audio_path):
                os.remove(audio_path)

            print("[INFO] Done. Returning result.")

            return {
                "success": True,
                "transcript": {
                    "text": transcript_text,
                    "language": language
                },
                "video_info": {
                    "title": yt.title,
                    "duration": duration
                },
                "pdf_url": f"/static/transcripts/{pdf_filename}"
            }

        except Exception as e:
            print("[ERROR] Exception during YouTube processing:")
            traceback.print_exc()
            return {"success": False, "error": f"Exception occurred: {str(e)}"}
