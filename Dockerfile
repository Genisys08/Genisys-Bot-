# Use Node.js LTS as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port for Express server
EXPOSE 3000

# Start the bot
CMD ["node", "index.js"]