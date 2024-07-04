# Use Node.js 14 LTS as base image
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /app

COPY  . .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5000 (or the port your application runs on)
EXPOSE 5000

# Command to run your application
CMD ["npm", "start"]
