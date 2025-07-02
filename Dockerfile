# Multi-stage build for complete PlacementPro platform
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml* ./
COPY next.config.mjs postcss.config.mjs* tailwind.config.js* tsconfig.json* ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code
COPY app/ ./app/
COPY components/ ./components/
COPY contexts/ ./contexts/
COPY hooks/ ./hooks/
COPY lib/ ./lib/
COPY public/ ./public/
COPY styles/ ./styles/

# Build Next.js frontend
RUN pnpm build

# Python runtime stage with Node.js
FROM node:18-slim

WORKDIR /app

# Install system dependencies and Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    supervisor \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Copy and install Python dependencies with break-system-packages
COPY requirements.txt .
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

# Copy backend source
COPY main.py chat_server.py ./
COPY utils/ ./utils/
COPY scripts/ ./scripts/
COPY webcam_recorder.py* ./

# Copy built frontend
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/package.json ./
COPY next.config.mjs* ./

# Create directories
RUN mkdir -p static temp static/reports static/summaries static/transcripts

# Create supervisor configuration
RUN printf '[supervisord]\n\
nodaemon=true\n\
user=root\n\
loglevel=info\n\
\n\
[program:backend]\n\
command=python3 main.py\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/backend.err.log\n\
stdout_logfile=/var/log/backend.out.log\n\
environment=PYTHONUNBUFFERED=1\n\
\n\
[program:chat]\n\
command=python3 chat_server.py\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/chat.err.log\n\
stdout_logfile=/var/log/chat.out.log\n\
environment=PYTHONUNBUFFERED=1\n\
\n\
[program:frontend]\n\
command=pnpm start\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/frontend.err.log\n\
stdout_logfile=/var/log/frontend.out.log\n\
' > /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 3000 5000 8000

# Health check
RUN printf '#!/bin/bash\n\
curl -f http://localhost:8000/api/health --max-time 10 --connect-timeout 5 || exit 1\n\
' > /healthcheck.sh && chmod +x /healthcheck.sh

HEALTHCHECK --interval=30s --timeout=15s --start-period=120s --retries=3 CMD ["/healthcheck.sh"]

# Start all services with supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]