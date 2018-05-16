FROM node:latest

MAINTAINER SHUBHRA MITTAL

COPY . /app
WORKDIR /app

EXPOSE 80

RUN npm install ember-cli -g
RUN npm install --loglevel verbose

ENTRYPOINT ["npm" "start"]


