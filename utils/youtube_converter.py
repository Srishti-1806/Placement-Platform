import yt_dlp
import whisper
import os
import tempfile
from pathlib import Path
import re
from fpdf import FPDF

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

def download_youtube_audio(url, output_path):
    """Download audio from YouTube video"""
    try:
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
        raise Exception(f"Error downloading YouTube video: {str(e)}")

def transcribe_audio_whisper(audio_path):
    """Transcribe audio using Whisper"""
    try:
        model = whisper.load_model("base")
        result = model.transcribe(audio_path)
        
        # Extract segments with timestamps
        segments = []
        for segment in result['segments']:
            segments.append({
                'start': segment['start'],
                'end': segment['end'],
                'text': segment['text'].strip()
            })
        
        return {
            'full_text': result['text'],
            'segments': segments,
            'language': result['language']
        }
    except Exception as e:
        raise Exception(f"Error transcribing audio: {str(e)}")

def format_timestamp(seconds):
    """Format seconds to MM:SS format"""
    minutes = int(seconds // 60)
    seconds = int(seconds % 60)
    return f"{minutes:02d}:{seconds:02d}"

def generate_transcript_pdf(video_info, transcript_data, output_path):
    """Generate PDF with transcript"""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    # Title
    pdf.set_font("Arial", 'B', size=16)
    pdf.cell(200, 10, txt="YouTube Video Transcript", ln=True, align='C')
    pdf.ln(5)
    
    # Video info
    pdf.set_font("Arial", 'B', size=14)
    pdf.cell(0, 10, txt="Video Information:", ln=True)
    pdf.set_font("Arial", size=11)
    
    # Handle unicode characters in title
    try:
        pdf.multi_cell(0, 8, txt=f"Title: {video_info['title']}")
    except:
        pdf.multi_cell(0, 8, txt="Title: [Contains special characters]")
    
    pdf.cell(0, 8, txt=f"Duration: {format_timestamp(video_info['duration'])}", ln=True)
    pdf.cell(0, 8, txt=f"Language: {transcript_data['language']}", ln=True)
    pdf.ln(5)
    
    # Full transcript
    pdf.set_font("Arial", 'B', size=14)
    pdf.cell(0, 10, txt="Full Transcript:", ln=True)
    pdf.set_font("Arial", size=10)
    
    # Handle unicode in transcript
    try:
        pdf.multi_cell(0, 6, txt=transcript_data['full_text'])
    except:
        pdf.multi_cell(0, 6, txt="[Transcript contains special characters that cannot be displayed]")
    
    pdf.ln(5)
    
    # Timestamped segments
    pdf.set_font("Arial", 'B', size=14)
    pdf.cell(0, 10, txt="Timestamped Segments:", ln=True)
    pdf.set_font("Arial", size=9)
    
    for segment in transcript_data['segments']:
        timestamp = f"[{format_timestamp(segment['start'])} - {format_timestamp(segment['end'])}]"
        pdf.set_font("Arial", 'B', size=9)
        pdf.cell(0, 6, txt=timestamp, ln=True)
        pdf.set_font("Arial", size=9)
        
        # Handle unicode in segment text
        try:
            pdf.multi_cell(0, 5, txt=segment['text'])
        except:
            pdf.multi_cell(0, 5, txt="[Text contains special characters]")
        pdf.ln(2)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    return output_path

def youtube_to_transcript(url):
    """Main function to convert YouTube video to transcript"""
    try:
        # Create temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            # Download audio
            audio_output = os.path.join(temp_dir, "audio.%(ext)s")
            video_info = download_youtube_audio(url, audio_output)
            
            # Transcribe audio
            audio_path = video_info['audio_path']
            transcript_data = transcribe_audio_whisper(audio_path)
            
            return {
                'video_info': video_info,
                'transcript': transcript_data,
                'success': True
            }
            
    except Exception as e:
        return {
            'error': str(e),
            'success': False
        }
