# ---------- Build stage ----------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .npmrc ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY . .

# Install dependencies
RUN npm ci

# Build the app
RUN npm run build

# ---------- Production stage ----------
FROM caddy:2-alpine AS prod

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/caddy

# Copy your custom Caddyfile (if you have it)
COPY Caddyfile /etc/caddy/Caddyfile

# Optional: format Caddyfile (from your previous step)
RUN caddy fmt --overwrite /etc/caddy/Caddyfile

# Expose port (default 80)
EXPOSE 80

# Caddy runs as entrypoint by default, nothing to do here
