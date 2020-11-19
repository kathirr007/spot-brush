FROM node:12.18.3
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/spotbrush

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# App running port
EXPOSE 3000

CMD ["node", "server/index.js"]
