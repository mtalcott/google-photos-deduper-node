FROM node:10

WORKDIR /starter
ENV NODE_ENV development

COPY package.json /starter/package.json
COPY package-lock.json /starter/package-lock.json

RUN npm install

COPY .env.example /starter/.env.example
COPY . /starter

CMD ["npm","start"]

EXPOSE 8080
