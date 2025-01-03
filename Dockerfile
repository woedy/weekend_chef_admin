<<<<<<< HEAD
# Use the official Node.js image.
FROM node:16

# Set the working directory.
WORKDIR /weekend_chef_site

# Copy package.json and package-lock.json (if available).
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application files.
COPY . .

# Expose the port the app runs on.
#EXPOSE 5173

# Command to run the app.
CMD ["npm", "run", "dev"]
=======
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
