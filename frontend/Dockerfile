FROM node:8.4.0-alpine
MAINTAINER Josias Iquabius <iquabius@gmail.com>

WORKDIR /usr/src/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD npm run build && npm start
