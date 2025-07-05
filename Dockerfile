# ---- Stage 1: Node dependencies and frontend build ----
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY frontend ./
RUN pnpm build

# ---- Stage 2: Python dependencies and backend build ----
FROM python:3.11-slim AS backend-builder

WORKDIR /app
COPY backend/requirements.txt .
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

COPY backend .

# ---- Stage 3: Final image ----
FROM python:3.11-slim

# -- System dependencies --
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        supervisor \
        curl \
        && rm -rf /var/lib/apt/lists/*

# -- Copy Python environment and backend --
COPY --from=backend-builder /opt/venv /opt/venv
COPY --from=backend-builder /app /app/backend

# -- Copy frontend build output only --
COPY --from=frontend-builder /app/frontend/.next /app/frontend/.next
COPY --from=frontend-builder /app/frontend/public /app/frontend/public
COPY --from=frontend-builder /app/frontend/package.json /app/frontend/package.json
COPY --from=frontend-builder /app/frontend/pnpm-lock.yaml /app/frontend/pnpm-lock.yaml
COPY --from=frontend-builder /app/frontend/node_modules /app/frontend/node_modules

WORKDIR /app

# -- Copy supervisor config --
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# -- Setup environment --
ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    IN_DOCKER=true

# -- Create non-root user --
RUN useradd -m appuser
USER appuser

EXPOSE 3000 5000 8000 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]