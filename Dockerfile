# Use the official Node.js image as the base
FROM node:16

# Set the working directory
WORKDIR /usr/src/


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the app's source code
COPY . .

# Expose the app's port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]