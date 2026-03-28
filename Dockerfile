# ---- Stage 1: Build React frontend ----
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# Pass build-time API URL (Railway sets this env var automatically)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# ---- Stage 2: Node.js backend + serve static frontend ----
FROM node:20-alpine AS production

WORKDIR /app

# Backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# Backend source
COPY backend/ ./backend/

# Copy built frontend into the location the server expects
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

WORKDIR /app/backend

# Railway handles port exposure dynamically; no need for fixed EXPOSE 3001
ENV NODE_ENV=production

# Use the full path for the start command to ensure it runs from any context
CMD ["node", "/app/backend/server.js"]
