# To Do List Backend

## Node Version
 - `v20.15.1`

## Setup Instructions

- clone the repository
- go to into `todo-list-server` directory.
- copy `.env.example` and paste `.env`.
- update `PORT` and other env values as relevant.
- `FRONT_END_URL` value is the url to `todo-list-frontend` development server.
- copy `storage/todo-list-example.json` and paste `storage/todo-list.json`
- run `npm install`
- run `npm run dev`

```sh
cd todo-list-server
cp .env.example .env
cp storage/todo-list-example.json storage/todo-list.json 
npm install
npm run dev
```