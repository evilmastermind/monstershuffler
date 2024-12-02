# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Build SPA
RUN yarn generate

# Production stage
FROM nginx:alpine

# Copy built SPA files to Nginx html directory
COPY --from=build /app/.output/public /usr/share/nginx/html

# Use the Nginx config we discussed earlier
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Nginx runs by default
