FROM node:9.11.2-stretch
MAINTAINER numigi <contact@numigi.com>

RUN useradd -ms /bin/bash client
WORKDIR /home/client

USER client

COPY package.json .
RUN npm install

COPY .docker_files/ava ava
COPY --chown=client:client vue_stock_forecast vue_stock_forecast
