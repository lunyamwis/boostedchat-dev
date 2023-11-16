# build stage
FROM node:18.15.0-buster-slim as build

RUN npm install -g pnpm

WORKDIR /code

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .

RUN pnpm install -r --offline

RUN pnpm run build

# prod stage
FROM nginx:1.22.1-alpine as prod

COPY --from=build /code/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
