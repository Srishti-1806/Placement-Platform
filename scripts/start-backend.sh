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
