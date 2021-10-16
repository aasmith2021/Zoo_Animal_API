# specify the node base image with your desired version node:<version>
FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

# replace this with your application's default port
EXPOSE 3000