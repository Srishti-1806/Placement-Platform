#!/bin/bash
echo "🚀 Starting PlacementPro Chat Server..."
echo "📦 Installing dependencies..."

pip install flask flask-socketio flask-cors

echo "🔥 Starting chat server on port 5000..."
python chat_server.py
