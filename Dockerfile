FROM node:22-alpine3.18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./prisma prisma

RUN npm install
RUN npx prisma generate

COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]