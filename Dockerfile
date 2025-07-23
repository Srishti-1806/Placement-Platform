# ---- Stage 1: Node dependencies and frontend build ----
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files for caching
COPY package.json pnpm-lock.yaml* ./
COPY next.config.mjs postcss.config.mjs* tailwind.config.js* tsconfig.json* ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# ✅ FIXED: Use apk instead of apt-get (Alpine)
RUN apk add --no-cache ffmpeg git

# Copy source code
COPY app/ ./app/
COPY components/ ./components/
COPY contexts/ ./contexts/
COPY hooks/ ./hooks/
COPY lib/ ./lib/
COPY public/ ./public/
COPY styles/ ./styles/

# Set environment variables for Next.js build
ENV FRONTEND_URL="http://16.171.134.238"
ENV BACKEND_URL="http://16.171.134.238:8000"
ENV CHAT_URL="ws://16.171.134.238:5000"
ENV CHAT_WS_URL="ws://16.171.134.238:5000"
ENV NEXT_PUBLIC_API_URL="http://16.171.134.238:8000"
ENV NEXT_PUBLIC_CHAT_WS_URL="ws://16.171.134.238:5000"

# Build frontend
RUN pnpm build

# ---- Stage 2: Python dependencies and backend build ----
FROM python:3.11-slim AS backend-builder

WORKDIR /app

# System dependencies for OpenCV and libGL
RUN apt-get update && \
    apt-get install -y --no-install-recommends libgl1 && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install --timeout=1000 --no-cache-dir -r requirements.txt

# Copy backend source files
COPY *.py ./
COPY utils/ ./utils/
COPY supervisord.conf ./

# Ensure utils is a Python package
RUN touch utils/__init__.py

# ---- Stage 3: Final image ----
FROM python:3.11-slim

WORKDIR /app

# System dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        supervisor \
        curl \
        nodejs \
        npm \
        libgl1 \
        libglib2.0-0 \
        libglib2.0-bin \
        libgstreamer1.0-0 \
        ffmpeg \
        git && \
    rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip setuptools wheel

# Copy Python environment and backend
COPY --from=backend-builder /opt/venv /opt/venv
COPY --from=backend-builder /app/*.py /app/
COPY --from=backend-builder /app/utils /app/utils
COPY --from=backend-builder /app/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy frontend build and config
COPY --from=frontend-builder /app/.next /app/.next
COPY --from=frontend-builder /app/public /app/public
COPY --from=frontend-builder /app/package.json /app/package.json
COPY --from=frontend-builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=frontend-builder /app/next.config.mjs /app/next.config.mjs

# Environment
ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    IN_DOCKER=true \
    PYTHONPATH=/app

# Create log folders for supervisor
RUN mkdir -p /app/logs && \
    touch /app/logs/backend.out.log /app/logs/backend.err.log \
          /app/logs/chat.out.log /app/logs/chat.err.log \
          /app/logs/frontend.out.log /app/logs/frontend.err.log && \
    chmod -R 777 /app/logs

# Health check script
RUN printf '#!/bin/bash\n\
for i in {1..3}; do\n\
  curl -sf http://localhost:8000/api/health > /dev/null && exit 0\n\
  echo "Attempt $i: Health check failed, retrying..."\n\
  sleep 5\n\
done\n\
exit 1\n' > /healthcheck.sh && chmod +x /healthcheck.sh

# Install pnpm and production node_modules
RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Use non-root user for safety
RUN useradd -m appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 3000 5000 8000 80 8501

HEALTHCHECK --interval=30s --timeout=15s --start-period=120s --retries=3 CMD ["/healthcheck.sh"]

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
