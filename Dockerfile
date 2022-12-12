FROM node:19.2-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:stable-alpine

COPY --from=build-step /app/dist/task_manager_angular /usr/share/nginx/html