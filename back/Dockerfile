FROM node:20.5-alpine
WORKDIR /usr/src/app
COPY package.*.json /usr/src/app/
COPY . .
RUN yarn install
RUN yarn build
CMD [ "yarn", "start" ]