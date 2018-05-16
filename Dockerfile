FROM node:latest

MAINTAINER SHUBHRA MITTAL

COPY package.json /usr/src/app
RUN npm install ember-cli -g

WORKDIR /usr/src/app

RUN npm install --loglevel verbose

RUN npm run start


EXPOSE 80
