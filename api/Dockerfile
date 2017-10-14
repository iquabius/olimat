FROM node:8.7.0-alpine

ENV NODE_ENV=production

WORKDIR /olimat/api

COPY package.json package-lock.json ./

RUN npm install --quiet && \
    npm cache clean --force

COPY ./public ./public
COPY ./config ./config
COPY ./src ./src
COPY ./bin ./bin

CMD npm start
