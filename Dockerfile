# Use a Node.js base image
FROM node:16

# Set the working directory
WORKDIR /gehey_app

# Copy package files and install dependencies using npm
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Build the React app using Vite
RUN npm run build

# Install serve to serve the app
RUN npm install -g serve

# Start the app
CMD ["serve", "-s", "dist"]
