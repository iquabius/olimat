FROM node:8.4.0-alpine

ENV NODE_ENV=production

WORKDIR /olimat/api

COPY package.json package-lock.json ./

RUN npm install --quiet

COPY ./public ./public
COPY ./config ./config
COPY ./src ./src

CMD npm start
