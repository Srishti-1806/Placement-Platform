import subprocess
import os
import tempfile
import wave
import contextlib

def analyze_speech(video_path: str) -> int:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
        temp_wav = temp_audio.name

    subprocess.call([
        "ffmpeg", "-y", "-i", video_path,
        "-ac", "1", "-ar", "16000",
        temp_wav
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    with contextlib.closing(wave.open(temp_wav, 'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)

    if duration < 3:
        score = 40
    elif 3 <= duration <= 15:
        score = 90
    elif 15 < duration <= 30:
        score = 75
    else:
        score = 60

    os.remove(temp_wav)
    return score
