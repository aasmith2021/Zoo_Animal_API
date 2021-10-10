# specify the node base image with your desired version node:<version>
FROM node:14

WORKDIR /app

COPY ./ ./

RUN npm install

CMD ["npm", "start"]

# replace this with your application's default port
EXPOSE 3000