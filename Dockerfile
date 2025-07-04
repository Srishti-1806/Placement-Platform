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

# Create a non-root user for security
RUN useradd -ms /bin/bash appuser

# Install pnpm globally
RUN npm install -g pnpm

# Set up Python virtual environment for isolation
RUN python3 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

# Copy and install Python dependencies in venv
COPY requirements.txt .
RUN /app/venv/bin/pip install --no-cache-dir -r requirements.txt && \
    apt-get remove -y build-essential python3-dev && apt-get autoremove -y

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
RUN mkdir -p static temp static/reports static/summaries static/transcripts /app/logs

# Change ownership to non-root user
RUN chown -R appuser:appuser /app

# Create supervisor configuration
RUN printf '[supervisord]\n\
nodaemon=true\n\
user=appuser\n\
loglevel=info\n\
\n\
[program:backend]\n\
command=/app/venv/bin/python main.py\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/app/logs/backend.err.log\n\
stdout_logfile=/app/logs/backend.out.log\n\
environment=PYTHONUNBUFFERED=1,IN_DOCKER=true,FRONTEND_URL="http://%%(ENV_HOSTNAME)s:3000",CHAT_URL="http://%%(ENV_HOSTNAME)s:5000",BACKEND_URL="http://%%(ENV_HOSTNAME)s:8000"\n\
\n\
[program:chat]\n\
command=/app/venv/bin/python chat_server.py\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/app/logs/chat.err.log\n\
stdout_logfile=/app/logs/chat.out.log\n\
environment=PYTHONUNBUFFERED=1\n\
\n\
[program:frontend]\n\
command=pnpm start\n\
directory=/app\n\
autostart=true\n\
autorestart=true\n\
stderr_logfile=/app/logs/frontend.err.log\n\
stdout_logfile=/app/logs/frontend.out.log\n\
environment=NEXT_PUBLIC_BACKEND_URL="http://${HOSTNAME:-localhost}:8000",NEXT_PUBLIC_CHAT_URL="http://${HOSTNAME:-localhost}:5000"' > /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 3000 5000 8000

# Health check
RUN printf '#!/bin/bash\n\
for i in {1..3}; do\n\
  curl -sf http://localhost:8000/api/health > /dev/null && exit 0\n\
  echo "Attempt $i: Health check failed, retrying..."\n\
  sleep 5\n\
done\n\
exit 1\n' > /healthcheck.sh && chmod +x /healthcheck.sh

HEALTHCHECK --interval=30s --timeout=15s --start-period=120s --retries=3 CMD ["/healthcheck.sh"]

# Switch to non-root user
USER appuser

# Create supervisor log directories and set permissions
RUN mkdir -p /app/logs && \
    touch /app/logs/backend.out.log /app/logs/backend.err.log \
          /app/logs/chat.out.log /app/logs/chat.err.log \
          /app/logs/frontend.out.log /app/logs/frontend.err.log && \
    chmod -R 777 /app/logs

# Start all services with supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]