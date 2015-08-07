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


#3. WORK DIR

WORKDIR /src

#3. RUN

RUN sed 's/127.0.0.1/0.0.0.0/' config.example.js > config.js
RUN npm install --production
RUN npm install --save --production mailchimp
RUN npm install --save --production mailchimp-api
RUN bower install --allow-root
RUN cd ./content/themes/codefresh && bower install --allow-root
RUN grunt init
RUN grunt prod

CMD npm start


EXPOSE 2368

