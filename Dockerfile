FROM ubuntu:latest
MAINTAINER raziel@codefresh.io

#1. RUN
RUN apt-get update && apt-get install --yes nodejs
RUN apt-get install --yes nodejs-legacy
RUN apt-get install --yes npm
RUN apt-get install -y wget curl git git-core zip
RUN npm install -g bower grunt-cli forever
RUN apt-get clean

#2. COPY
COPY . /blog

#3. WORK DIR
WORKDIR /blog

#4. RUN
RUN sed 's/127.0.0.1/0.0.0.0/' config.example.js > config.js
RUN npm install
RUN npm install --production
RUN npm install --save --production mailchimp
RUN npm install --save --production mailchimp-api
RUN npm cache clean
RUN npm rebuild node-sass
RUN bower install --allow-root
RUN cd ./content/themes/codefresh && bower install --allow-root
RUN grunt init
RUN grunt prod

EXPOSE 2368

CMD forever ./index.js
