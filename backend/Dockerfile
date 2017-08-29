FROM node:8.4.0
MAINTAINER Josias Iquabius <iquabius@gmail.com>

WORKDIR /usr/src/backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD node qewd-server
