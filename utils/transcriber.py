import whisper
import tempfile
import subprocess
import os

# Load Whisper model once globally
model = whisper.load_model("base")

def extract_audio_with_docker(video_path: str, audio_path: str):
    """
    Extract audio from video using Docker FFmpeg container.
    Ensure `temp` is mounted in docker-compose.yml.
    """
    container_video = f"/app/{os.path.basename(video_path)}"
    container_audio = f"/app/{os.path.basename(audio_path)}"

    command = [
        "docker", "exec", "ffmpeg",
        "ffmpeg", "-y",
        "-i", container_video,
        "-ac", "1", "-ar", "16000",
        container_audio
    ]

    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"FFmpeg via Docker failed: {e}")

def transcribe_audio(video_path: str) -> str:
    """
    Extract audio and run Whisper transcription.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video not found: {video_path}")

    # Ensure temp folder exists
    os.makedirs("temp", exist_ok=True)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav", dir="temp") as tmp:
        audio_path = tmp.name

    try:
        extract_audio_with_docker(video_path, audio_path)
        result = model.transcribe(audio_path)
        return result["text"].strip()
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)
