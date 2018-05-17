FROM node:8.1.2
MAINTAINER Shubhra Mittal <shubhra.goel@gmail.com>

COPY . /opt/startup
COPY ./app/index.html /home/site/wwwroot/hostingstart.html
COPY sshd_config /etc/ssh/

RUN mkdir -p /home/LogFiles \
     && echo "root:Docker!" | chpasswd \
     && apt update \
     && apt install -y --no-install-recommends openssh-server

# Workaround for https://github.com/npm/npm/issues/16892
# Running npm install as root blows up in a  --userns-remap
# environment.

RUN chmod -R 777 /opt/startup \
     && mkdir /opt/pm2 \
     && chmod 777 /opt/pm2 \
     && ln -s /opt/pm2/node_modules/pm2/bin/pm2 /usr/local/bin/pm2

USER node

RUN cd /opt/pm2 \
  && npm install pm2 \
  && cd /opt/startup \
  && npm install \
  && npm install ember-cli -g --verbose

USER root

# End workaround

EXPOSE 2222 8080

ENV PM2HOME /pm2home

ENV PORT 8080
ENV WEBSITE_ROLE_INSTANCE_ID localRoleInstance
ENV WEBSITE_INSTANCE_ID localInstance
ENV PATH ${PATH}:/home/site/wwwroot

WORKDIR /home/site/wwwroot

ENTRYPOINT ["/opt/startup/init_container.sh"]