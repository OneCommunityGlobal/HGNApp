# base image
FROM node:9.6.1



# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g ember-cli

# add app
COPY . /usr/src/app

# start app
CMD ember serve --port 8080 --host 0.0.0.0