FROM oven/bun:canary-alpine AS base

WORKDIR /app

ENV NODE_ENV=production

# Copy only package.json and lockfile
COPY package*.json ./
COPY index.html ./

# Install dependencies (cacheable layer)
RUN bun install

# --- Builder Stage ---
FROM base AS builder

ENV NODE_ENV=production

# Copy source code
COPY . .

# Build the application
RUN bun run build

# --- Deploy Stage ---
FROM oven/bun:canary-alpine AS deploy

ENV NODE_ENV=production

WORKDIR /app

# Install http-server globally, only needed at runtime
RUN bun install -g http-server

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

#Copy index.html to root
COPY --from=builder /app/index.html ./

EXPOSE 8080

CMD ["http-server", "--gzip"]