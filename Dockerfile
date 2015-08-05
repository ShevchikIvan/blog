FROM codefresh/slimbuntu:latest

RUN \
      sudo apt-get -qq update \
  &&  sudo apt-get -y --no-install-recommends install \
      nodejs \
      npm \
  &&  apt-get clean autoclean \
  &&  apt-get autoremove --yes \
  &&  rm -rf /var/lib/{apt,dpkg,cache,log}/

RUN sudo ln -s "$(which nodejs)" /usr/bin/node

RUN \
  npm install -g \
  npm \
  bower \
  grunt-cli \
  forever \
  node-sass \
  && npm cache clean \
  && npm rebuild node-sass

#application server port
EXPOSE 2368
ENV PORT 2368

COPY . /ghost
WORKDIR /ghost

RUN \
  npm install \
  && npm cache clean

RUN grunt init
RUN grunt start
CMD ["npm", "start"]

LABEL "io.codefresh.owner"="codefresh"
