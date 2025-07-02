# Multi-stage build for complete PlacementPro platform
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY next.config.mjs* ./
COPY postcss.config.mjs* ./
COPY tailwind.config.js* ./
COPY tsconfig.json* ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy frontend source code
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

# Install Python and system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    curl \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Copy Python requirements and install
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy backend source
COPY main.py .
COPY utils/ ./utils/
COPY scripts/ ./scripts/
COPY webcam_recorder.py* ./

# Copy chat server
COPY chat_server.py .

# Copy built frontend
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY package.json ./
COPY next.config.mjs* ./

# Create necessary directories
RUN mkdir -p static temp static/reports static/summaries static/transcripts

# Create supervisor configuration for all services
RUN echo '[supervisord]\n\
nodaemon=true\n\
user=root\n\
\n\
[program:backend]\n\
command=python3 main.py\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/backend.err.log\n\
stdout_logfile=/var/log/backend.out.log\n\
\n\
[program:chat]\n\
command=python3 chat_server.py\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/chat.err.log\n\
stdout_logfile=/var/log/chat.out.log\n\
\n\
[program:frontend]\n\
command=pnpm start\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/var/log/frontend.err.log\n\
stdout_logfile=/var/log/frontend.out.log\n\
' > /etc/supervisor/conf.d/supervisord.conf

# Expose all ports
EXPOSE 3000 5000 8000

# Health check for all services
RUN echo '#!/bin/bash\n\
curl -f http://localhost:8000/api/health && \\\n\
curl -f http://localhost:3000 && \\\n\
curl -f http://localhost:5000 || exit 1\n\
' > /healthcheck.sh && chmod +x /healthcheck.sh

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 CMD ["/healthcheck.sh"]

# Start all services with supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]