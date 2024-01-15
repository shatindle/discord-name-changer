FROM node:16-alpine
WORKDIR /app

COPY . .

RUN npm i

ENTRYPOINT [ "node", "./index.js" ]