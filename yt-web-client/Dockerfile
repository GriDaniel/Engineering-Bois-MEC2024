# Stage 1: Build stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy other source code files
COPY . .

# Build app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Set working directory
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install only prod dep
RUN npm install --only=production

# Copy built app (compiled files = smaller than src) from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Run app
CMD ["npm", "start"]