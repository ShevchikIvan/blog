FROM ubuntu:latest
MAINTAINER raziel@codefresh.io

#1. RUN
RUN apt-get update && apt-get install --yes nodejs
RUN apt-get install --yes nodejs-legacy
RUN apt-get install --yes npm
RUN apt-get install -y wget curl git git-core zip
RUN npm install -g bower grunt-cli
RUN apt-get clean

#2. COPY
COPY . /src

#3. RUN

RUN mv /src/config.example.js /src/config.js
RUN cd /src && npm install
RUN cd /src && npm install --save mailchimp
RUN cd /src && npm install --save mailchimp-api
RUN cd /src && bower install --allow-root
RUN cd /src/content/themes/codefresh && bower install --allow-root
#RUN cd /src && grunt init

