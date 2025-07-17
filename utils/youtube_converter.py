import yt_dlp
import whisper
import os
import tempfile
from pathlib import Path
import re
from fpdf import FPDF

class YouTubeConverter:
    def extract_video_id(url):
        """Extract video ID from YouTube URL"""
        patterns = [
            r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)',
            r'youtube\.com\/watch\?.*v=([^&\n?#]+)'
        ]
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        raise ValueError("Invalid YouTube URL")

    def download_youtube_audio(self, url, output_path):
        """Download audio from YouTube video"""
        try:
            print("Downloading audio from:", url)
            ydl_opts = {
                'format': 'bestaudio/best',
                'outtmpl': output_path,
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
                'quiet': True,
                'no_warnings': True,
                'noplaylist': True,
                'http_headers': {
                'User-Agent': (
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                    'AppleWebKit/537.36 (KHTML, like Gecko) '
                    'Chrome/114.0.0.0 Safari/537.36'
                ),
                'Accept': '/',
                'Accept-Language': 'en-US,en;q=0.9'}
                # Removed custom http_headers to avoid 403 error
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                title = info.get('title', 'Unknown')
                duration = info.get('duration', 0)

            return {
                'title': title,
                'duration': duration,
                'audio_path': output_path.replace('.%(ext)s', '.mp3')
            }

        except Exception as e:
            print("[ERROR] Failed to load Whisper model:", str(e))
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

            title = yt.title.replace(" ", "").replace("/", "").replace("\\", "_")
            duration = str(timedelta(seconds=int(yt.length)))

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
                f"Title: {yt.title}\nDuration: {duration}\nLanguage: {language}\n\nTranscript:\n{transcript_text}"
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
                    "duration": duration
                },
                "pdf_url": f"/static/transcripts/{pdf_filename}"
            }

        except Exception as e:
            return {
                'error': str(e),
                'success': False
            }