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
            print("[INFO] Loading Whisper model...")
            self.model = whisper.load_model("base")
        except Exception as e:
            print("[ERROR] Failed to load Whisper model:", str(e))
            raise

        self.output_dir = "static/transcripts"
        os.makedirs(self.output_dir, exist_ok=True)

    def sanitize_youtube_url(self, url: str) -> str:
        # Strip timestamps or additional query params like &t= etc.
        if "&" in url:
            url = url.split("&")[0]
        return url.strip()

    def youtube_to_transcript(self, url: str):
        try:
            sanitized_url = self.sanitize_youtube_url(url)
            print(f"[INFO] Processing sanitized YouTube URL: {sanitized_url}")

            try:
                yt = YouTube(sanitized_url)
            except Exception as e:
                import traceback
                print("[ERROR] Failed to create YouTube object:", str(e))
                traceback.print_exc()  # <-- This will show the root problem in the terminal.
                return {
                    "success": False,
                    "error": f"Failed to fetch YouTube video: {str(e)}"
                }


            audio_stream = yt.streams.filter(only_audio=True).first()
            if not audio_stream:
                return {"success": False, "error": "No audio stream found for this video."}

            title = yt.title.replace(" ", "_").replace("/", "_").replace("\\", "_")
            duration_seconds = int(yt.length)
            duration_str = str(timedelta(seconds=duration_seconds))

            # Download audio to temp file
            with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as tmp_file:
                audio_path = tmp_file.name

            print(f"[INFO] Downloading audio to: {audio_path}")
            audio_stream.download(filename=audio_path)

            # Validate download
            if not os.path.exists(audio_path) or os.path.getsize(audio_path) < 1000:
                return {"success": False, "error": "Audio download failed or is too small."}

            # Transcribe audio using Whisper
            print("[INFO] Starting transcription...")
            result = self.model.transcribe(audio_path)
            transcript_text = result.get("text", "").strip()
            language = result.get("language", "unknown")

            if not transcript_text:
                raise ValueError("Transcription failed or returned empty result.")

            # Generate PDF
            print("[INFO] Generating PDF...")
            pdf = FPDF()
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            pdf.multi_cell(
                0, 10,
                f"Title: {yt.title}\nDuration: {duration_str}\nLanguage: {language}\n\nTranscript:\n{transcript_text}"
            )

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
                    "duration": duration_seconds  # Return as seconds for frontend formatting
                },
                "pdf_url": f"/static/transcripts/{pdf_filename}"
            }

        except Exception as e:
            print("[ERROR] Exception during YouTube processing:")
            traceback.print_exc()
            return {
                "success": False,
                "error": f"Exception occurred: {str(e)}"
            }
