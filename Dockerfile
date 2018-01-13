FROM node:9.2.0

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
USER node
RUN npm install -g tsc
ENV PATH="${NPM_CONFIG_PREFIX}/bin:${PATH}"

WORKDIR /home/node/application
