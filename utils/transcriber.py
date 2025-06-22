import whisper
import tempfile
import subprocess
import os

def transcribe_audio(video_path: str) -> str:
    # Load the Whisper model
    model = whisper.load_model("base")

    # Check if the video file exists
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")
    
    # Path to ffmpeg (update this if not in PATH)
    ffmpeg_path = "ffmpeg"  # or e.g., "C:/ffmpeg/bin/ffmpeg.exe"

    # Create temporary WAV file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
        audio_path = temp_audio.name

    # Convert video to mono 16kHz audio using ffmpeg
    try:
        subprocess.check_call([
            ffmpeg_path, "-y", "-i", video_path,
            "-ac", "1", "-ar", "16000",
            audio_path
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except FileNotFoundError:
        raise FileNotFoundError("ffmpeg not found. Please install ffmpeg and add it to your PATH.")
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"ffmpeg failed to convert the audio: {e}")

    # Transcribe using Whisper
    result = model.transcribe(audio_path)

    # Clean up temp file
    os.remove(audio_path)

    # Return transcript text
    return result["text"].strip()
