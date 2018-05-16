FROM node:latest

MAINTAINER SHUBHRA MITTAL

COPY package.json /usr/src/app
RUN npm install ember-cli -g
RUN npm install --loglevel verbose
COPY . /usr/src/app
RUN npm run start


EXPOSE 80
