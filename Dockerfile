FROM node:12.6.0
WORKDIR .
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build-staging
EXPOSE 3000
CMD ["yarn", "start"]
