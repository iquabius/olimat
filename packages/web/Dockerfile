FROM node:10.15.3-alpine

WORKDIR /usr/src/olimat

COPY package.json ./
# We don't use this because it would install Cypress
# RUN npm install --loglevel notice

COPY packages/api ./packages/api
COPY packages/web ./packages/web

COPY lerna.json .
RUN npx lerna bootstrap

RUN npm --prefix packages/web run build
