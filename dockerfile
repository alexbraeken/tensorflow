FROM node:18-slim

WORKDIR /app

# Install Python & dependencies for native tfjs-node build
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --build-from-source @tensorflow/tfjs-node

COPY . .

CMD ["npm", "test"]