FROM node:latest

MAINTAINER SHUBHRA MITTAL

COPY . /app
WORKDIR /app

EXPOSE 80

RUN npm install ember-cli -g
RUN npm install --loglevel verbose

# ssh
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "$SSH_PASSWD" | chpasswd 

COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/init.sh



ENTRYPOINT ["npm" "start"]


