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

📺 YouTube to PDF Transcript Generator
Input any YouTube video link.

Extract transcript and generate a downloadable PDF report.

Ideal for lectures, interviews, or tutorials.

📄 PDF Summarizer (TF-IDF)
Upload a PDF document.

Get a concise summary generated using TF-IDF based extractive summarization.

Supports academic papers, resumes, or long reports.

📊 ATS Resume Score Calculator
Upload your resume and a job description.

AI model calculates ATS compatibility score.

Highlights areas for improvement to increase job match chances.

🧾 Resume Builder
Create a professional-looking resume through a simple form.

Choose from four professional templates. Get the ats score calculated in hand along with live preview.

Export to PDF.

Auto-suggested content and skills based on career goals.

📚 DSA Sheets (Preparation Tracker)
Curated DSA sheets from top platforms like:

Love Babbar

Striver

GeeksforGeeks

Track your progress, mark completions, and stay consistent.

🌍 Regional Job Vacancies
Get real-time listings of jobs from your state/city/region.

Filter based on skill, domain, and experience level.

💬 Community Chat (Privacy-Preserved)
Engage in topic-specific conversations with like-minded peers.

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
git clone https://github.com/your-username/ai-career-companion.git
cd ai-career-companion

# Backend setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup
cd ../frontend
npm install
npm run dev
🛡️ Privacy & Ethics
All data is processed locally or securely on-server.

No personal identifiers are stored or shared.

Chat feature ensures anonymity and data encryption.

Open-source and transparent.

🙌 Contributing
We welcome contributions! Please raise an issue or open a PR with detailed information.

📄 License
This project is licensed under the MIT License.

🧑‍💼 Made For
Job Seekers

Students

Career Switchers

Developers preparing for interviews

Anyone who wants to improve communication, resumes, and job reach
