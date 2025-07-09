# ---- Stage 1: Node dependencies and frontend build ----
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files for caching
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

# ---- Stage 2: Python dependencies and backend build ----
FROM python:3.11-slim AS backend-builder

WORKDIR /app
COPY requirements.txt .
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install --timeout=1000 --no-cache-dir -r requirements.txt

# Copy all backend source (since you don't have a /backend folder)
COPY . .

# ---- Stage 3: Final image ----
FROM python:3.11-slim

# -- System dependencies --
# -- System dependencies --
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        supervisor \
        curl \
        nodejs \
        npm \
    && rm -rf /var/lib/apt/lists/*

# -- Copy Python environment and backend --
COPY --from=backend-builder /opt/venv /opt/venv
COPY --from=backend-builder /app /app

# -- Copy frontend build output only --
COPY --from=frontend-builder /app/.next /app/.next
COPY --from=frontend-builder /app/public /app/public
COPY --from=frontend-builder /app/node_modules /app/node_modules
COPY --from=frontend-builder /app/package.json /app/package.json
COPY --from=frontend-builder /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=frontend-builder /app/next.config.mjs /app/next.config.mjs

WORKDIR /app

# -- Copy supervisor config --
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# -- Setup environment --
ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    IN_DOCKER=true



# -- Create supervisor log directories and set permissions --
RUN mkdir -p /app/logs && \
    touch /app/logs/backend.out.log /app/logs/backend.err.log \
          /app/logs/chat.out.log /app/logs/chat.err.log \
          /app/logs/frontend.out.log /app/logs/frontend.err.log && \
    chmod -R 777 /app/logs

# -- Health check script --
RUN printf '#!/bin/bash\n\
for i in {1..3}; do\n\
  curl -sf http://localhost:8000/api/health > /dev/null && exit 0\n\
  echo "Attempt $i: Health check failed, retrying..."\n\
  sleep 5\n\
done\n\
exit 1\n' > /healthcheck.sh && chmod +x /healthcheck.sh

# -- Install pnpm in the final image --
RUN npm install -g pnpm

# -- Create non-root user --
RUN useradd -m appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 3000 5000 8000 80

HEALTHCHECK --interval=30s --timeout=15s --start-period=120s --retries=3 CMD ["/healthcheck.sh"]

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]