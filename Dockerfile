FROM node:16-alpine

# Create app directory
WORKDIR /Users/fernandomacbook/Desktop/MASTER_INESDI/Practica1_bootcamp/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Bind your app to port 8080
EXPOSE 8080

# CMD [ "node", "server.js" ]
CMD [ "node", "server.js" ]