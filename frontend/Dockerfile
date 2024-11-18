# Use Node.js official image
FROM node:18-alpine

ENV NEXT_TELEMETRY_DISABLED=1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the React application code
COPY . .

# Build the React app for production
RUN npm run build

# Expose the React app port
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Command to start the React server
CMD ["npm", "start"]
