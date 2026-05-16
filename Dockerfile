FROM node:22-alpine

# Install system dependencies for Chromium (Puppeteer)
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Configure Puppeteer to use system Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Create working directory
WORKDIR /app

# Copy dependency files
COPY package.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy source code
COPY src/ ./src/

# Create non-root user
RUN addgroup -S botgroup && adduser -S botuser -G botgroup

# Set permissions
RUN chown -R botuser:botgroup /app

# Switch to non-root user
USER botuser

# Start command
CMD ["node", "src/index.js"]
