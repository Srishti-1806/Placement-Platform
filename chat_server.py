import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template_string, request
from flask_socketio import SocketIO, emit, send
from flask_cors import CORS
import time
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'placement_pro_secret_2024!'

# Allow frontend origin for CORS (this is important for production)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
CORS(app, origins=[FRONTEND_URL, "http://13.60.246.221", "http://13.60.246.221:3000", "http://13.60.246.221:5000","ws://13.60.246.221:5000", "*"])
socketio = SocketIO(app, cors_allowed_origins=[FRONTEND_URL, "http://13.60.246.221", "http://13.60.246.221:3000", "http://13.60.246.221:5000", "ws://13.60.246.221:5000", "*"], async_mode='eventlet')

# Store connected users
connected_users = set()

@app.route('/')
def index():
    return render_template_string('''
    <!DOCTYPE html>
    <html>
    <head>
        <title>PlacementPro Community Chat Server</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #1a1a1a; color: white; }
            .container { max-width: 600px; margin: 0 auto; text-align: center; }
            .status { padding: 20px; background: #2a2a2a; border-radius: 8px; margin: 20px 0; }
            .online { color: #10b981; }
            .feature { background: #374151; padding: 15px; margin: 10px 0; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 PlacementPro Chat Server</h1>
            <div class="status">
                <h2 class="online">✅ Server is Running!</h2>
                <p>Connected Users: <span id="userCount">0</span></p>
                <p>Server Time: <span id="time"></span></p>
            </div>
            
            <div class="feature">
                <h3>💬 Real-time Community Chat</h3>
                <p>Students can connect and chat in real-time</p>
            </div>
            
            <div class="feature">
                <h3>🔗 WebSocket Connection</h3>
                <p>Low-latency messaging with Socket.IO</p>
            </div>
            
            <div class="feature">
                <h3>📱 Cross-Platform Support</h3>
                <p>Works on desktop and mobile devices</p>
            </div>
        </div>
        
        <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
        <script>
            const socket = io();
            
            socket.on('user_count', function(count) {
                document.getElementById('userCount').textContent = count;
            });
            
            setInterval(() => {
                document.getElementById('time').textContent = new Date().toLocaleString();
            }, 1000);
        </script>
    </body>
    </html>
    ''')

@socketio.on('connect')
def handle_connect(auth):
    connected_users.add(request.sid)
    emit('user_count', len(connected_users), broadcast=True)
    print(f'🟢 User connected: {request.sid} (Total: {len(connected_users)})')

@socketio.on('disconnect')
def handle_disconnect():
    connected_users.discard(request.sid)
    emit('user_count', len(connected_users), broadcast=True)
    print(f'🔴 User disconnected: {request.sid} (Total: {len(connected_users)})')

@socketio.on('message')
def handle_message(msg):
    timestamp = time.strftime('%H:%M:%S')
    formatted_msg = f"[{timestamp}] {msg}"
    print(f'📨 Message: {formatted_msg}')
    send(formatted_msg, broadcast=True)

if __name__ == '__main__':
    print("Starting PlacementPro Chat Server...")
    print(f"Server will be available at: http://localhost:5000")
    print("Chat functionality enabled")
    print("CORS enabled for all origins")
    socketio.run(app, host='0.0.0.0', port=5000, debug=False)  # Set debug=False for production
