FROM node:15.0-alpine as init-stage
WORKDIR /app

RUN yarn global add @vue/cli

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install