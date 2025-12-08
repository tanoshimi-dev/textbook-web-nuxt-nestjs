FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Development mode with hot reload
CMD ["npm", "run", "start:dev"]
