FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN apt-get update && apt-get install -y netcat

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "src/app.js" ]
