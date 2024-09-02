FROM node:20

WORKDIR /usr/src/app

ENV PORT=8000
ENV FRONT_END_URL=http://localhost:3000

COPY package*.json ./

RUN npm install

COPY . .

COPY ./storage/todo-list-example.json /usr/src/app/storage/todo-list.json

CMD ["npm", "run", "dev"]