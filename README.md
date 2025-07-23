🧠 AI-Powered Career Companion
A powerful, all-in-one career and personal development platform that blends advanced AI, ML, and community interaction. This project is designed to help users enhance their soft skills, optimize resumes, access job listings, and connect with like-minded individuals — all with privacy and performance in mind.

🚀 Features
🎥 AI Gesture & Speech Analysis
Upload a video or use your webcam.

Frame-by-frame analysis using MediaPipe and OpenCV.

Speech is transcribed using Whisper or similar ASR models.

Gestures, fluency, clarity, expression, and posture are evaluated.

LLM-based report generation with a scoring system and improvement feedback.

Export analysis and transcript to PDF.

<img width="1714" height="808" alt="image" src="https://github.com/user-attachments/assets/ac606026-ea85-476b-8280-03d12a1f9a90" /> 
![WhatsApp Image 2025-07-16 at 12 50 05_265b5e21](https://github.com/user-attachments/assets/fdddc8df-609d-4562-99ac-597791bcd573)


📺 YouTube to PDF Transcript Generator
Input any YouTube video link.

Extract transcript and generate a downloadable PDF report.

Ideal for lectures, interviews, or tutorials.

<img width="1919" height="898" alt="image" src="https://github.com/user-attachments/assets/e1f12def-7266-4b44-a702-18672d698d95" />
<img width="1917" height="914" alt="image" src="https://github.com/user-attachments/assets/d01b8d60-1f07-4882-a768-1ad6388b51f3" />



📄 PDF Summarizer (TF-IDF)
Upload a PDF document.

Get a concise summary generated using TF-IDF based extractive summarization.

Supports academic papers, resumes, or long reports.

<img width="1716" height="797" alt="image" src="https://github.com/user-attachments/assets/2370e54a-e6cb-4b23-882b-d188d997a0b5" />

📊 ATS Resume Score Calculator
Upload your resume and a job description.

AI model calculates ATS compatibility score.

Highlights areas for improvement to increase job match chances.

🧾 Resume Builder
Create a professional-looking resume through a simple form.

Choose from four professional templates. Get the ats score calculated in hand along with live preview.

Export to PDF.

Auto-suggested content and skills based on career goals.

<img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/e91a9832-43ff-48f2-a3ff-efc772e38fea" />


📚 DSA Sheets (Preparation Tracker)
Curated DSA sheets from top platforms like:

Love Babbar

Striver

GeeksforGeeks

Track your progress, mark completions, and stay consistent.

<img width="1726" height="770" alt="image" src="https://github.com/user-attachments/assets/0865ded7-9588-4b25-b4c2-da70a6c6b574" />

📚 Company Specific Placement Material (Preparation Tracker)
Curated materials for top companies like:

Amazon

Google

Microsoft

Track your progress, mark completions, and stay consistent.

<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/79c4514d-9a90-452f-a1fe-8163e481a73c" />

🌍 Regional Job Vacancies
Get real-time listings of jobs from your state/city/region.

Filter based on skill, domain, and experience level.

<img width="1914" height="833" alt="image" src="https://github.com/user-attachments/assets/8a06696a-4cbb-459f-9310-38a25c6fcaa3" />


💬 Community Chat (Privacy-Preserved)
Engage in topic-specific conversations with like-minded peers.
<img width="402" height="589" alt="image" src="https://github.com/user-attachments/assets/81b6dec5-e978-46bf-b505-d23b323962fa" />


Encrypted and anonymous: No personal info shared.

Ideal for discussions on DSA, job prep, interviews, and career advice.

🧰 Tech Stack
Frontend: React.js / Next.js

Backend: FastAPI, Python

AI/ML:

MediaPipe & OpenCV for gesture tracking

Whisper / SpeechRecognition for transcription

TF-IDF (Scikit-learn / NLTK) for summarization

Custom ML for ATS scoring

GPT / LLaMA / other LLMs for feedback generation

Database: PostgreSQL / SQLite / ChromaDB (for document embeddings)

PDF: FPDF / PyMuPDF / ReportLab

Chat Server: WebSocket-based secure messaging

Storage: Local / S3-compatible file storage

📁 Project Structure
bash
Copy
Edit
.
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── main.py
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── public/
├── media/
│   └── uploads/
├── README.md
└── requirements.txt
⚙️ Installation
bash
Copy
Edit
# Clone the repo
git clone https://github.com/Srishti-1806/Placement-Platform/tree/main.git
cd ai-career-companion

# Backend setup
#!/bin/bash

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create necessary directories
mkdir -p static/reports
mkdir -p static/summaries  
mkdir -p static/transcripts
mkdir -p temp

# Start the FastAPI server
echo "Starting FastAPI server on port 8000..."
python main.py

###############################################################
docker exec -it ffmpeg sh
docker-compose up --build

# Frontend setup
npm install
npm run dev
🛡️ Privacy & Ethics
All data is processed locally or securely on-server.

No personal identifiers are stored or shared.

Chat feature ensures anonymity and data encryption.

Open-source and transparent.

Deployment Sites
🌐 Main Website: http://13.60.246.221
🎨 Frontend: http://13.60.246.221:3000
🔧 Backend API: http://13.60.246.221:8000
💬 Chat Server: http://13.60.246.221:5000
📖 API Docs: http://13.60.246.221:8000/docs
🏥 Health Check: http://13.60.246.221:8000/api/health


🙌 Contributing
We welcome contributions! Please raise an issue or open a PR with detailed information.



🧑‍💼 Made For
Job Seekers

Students

Career Switchers

Developers preparing for interviews

👨‍💻 Made By
Team Runtime Terrors
Crafted with 💡, 🤖, and ☕ by passionate students/developers focused on building AI-driven career tools.

👩‍💻 Naman Verma – Frontend & UX Designer
                 GitHub   : https://github.com/nimo247
                 LinkedIn : https://www.linkedin.com/in/naman-verma-a89a91239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app 

🧑‍💻 Srishti Mishra – AIML & Backend DeveloperDesigner
                    GitHub   : https://github.com/Srishti-1806
                    LinkedIn : https://www.linkedin.com/in/srishti-mishra-25b666328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app


🧑‍🔬 Satyam Gupta – DeBugger and Deployment
                   GitHub   : https://github.com/1WINgFIRE1
                   LinkedIn : 

🧑‍🔬 Piyush Yadav – Deployment & Chat - Community Integration
                   GitHub   : https://github.com/Piyushydv08
                   LinkedIn : 


COULD NOT BE DEPLOYED ON FREE TIER OF AWS, WAS COSTING US SEVERAL DOLLARS.
<img width="1283" height="690" alt="image" src="https://github.com/user-attachments/assets/e0444c5b-b429-4ccb-ac2c-3cbe3aced60e" />


🙏 Special thanks to all open-source contributors and mentors who supported this journey.

Anyone who wants to improve communication, resumes, and job reach
