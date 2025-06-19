#!/bin/bash

echo "🚀 Setting up ATS Calculator..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip."
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

# Download NLTK data
echo "📚 Downloading NLTK data..."
python3 -c "import nltk; nltk.download('stopwords'); nltk.download('punkt')"

# Test ATS calculator
echo "🧪 Testing ATS Calculator..."
python3 scripts/test_ats.py

if [ $? -eq 0 ]; then
    echo "✅ ATS Calculator setup complete!"
    echo "🚀 Starting FastAPI server..."
    python3 main.py
else
    echo "❌ ATS Calculator test failed. Please check the error messages above."
    exit 1
fi
