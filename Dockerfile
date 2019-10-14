FROM node:8

WORKDIR /starter
ENV NODE_ENV development

COPY package.json /starter/package.json

RUN npm install --production
RUN npm install -g nodemon

COPY .env.example /starter/.env.example
COPY . /starter

# CMD ["npm","start"]
CMD ["npm","run","start.dev"]

EXPOSE 8080
