FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install  yarn

RUN yarn install

RUN yarn run build

RUN yarn add serve -g

EXPOSE 3000

CMD ["yarn", "run", "dev", "--", "--host"]