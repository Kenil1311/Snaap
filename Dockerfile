# Step 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files only (after .dockerignore is in place)
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

# Clean default nginx web files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
