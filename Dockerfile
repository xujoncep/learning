# ────────────────────────────────
# Stage 1: Build the React app
# ────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY app/package*.json ./

# Install dependencies (--legacy-peer-deps for vite-plugin-pwa peer range)
RUN npm install --legacy-peer-deps

# Copy app source
COPY app/ ./

# The convert-md-to-mdx script reads from ../handnote
# Place source markdown files one level up so the script resolves them.
COPY handnote/ /handnote/

# Build the project (runs prebuild: convert + sitemap, then tsc + vite build)
RUN npm run build

# ────────────────────────────────
# Stage 2: Serve with Nginx
# ────────────────────────────────
FROM nginx:alpine

# Custom Nginx configuration (security headers, gzip, caching, SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/conf.d/security-headers.conf

# Built static assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck (lightweight)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
