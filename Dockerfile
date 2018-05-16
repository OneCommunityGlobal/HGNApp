FROM node:latest

MAINTAINER SHUBHRA MITTAL

COPY . /app
WORKDIR /app

RUN npm install ember-cli -g
RUN npm install --loglevel verbose

RUN npm run start


EXPOSE 80
