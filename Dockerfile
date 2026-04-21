# Step 1: Build the React Application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY app/ ./

# Build the project
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]