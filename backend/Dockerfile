FROM node:20-alpine

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Development mode with hot reload
CMD ["npm", "run", "start:dev"]
