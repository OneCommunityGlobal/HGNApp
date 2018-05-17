# base image
FROM node:9.6.1



# set working directory

WORKDIR /home/site/wwwroot

# add `/home/site/wwwroot/node_modules/.bin` to $PATH
ENV PATH /home/site/wwwroot/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /home/site/wwwroot/package.json
RUN npm install
RUN npm install -g ember-cli

# add app
COPY . /home/site/wwwroot

# start app
CMD ember serve --port 8080 --host 0.0.0.0