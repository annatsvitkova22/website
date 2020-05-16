FROM node:12.6.0
WORKDIR /home/staging/applications/zmist
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build-staging
CMD ["yarn", "start"]
