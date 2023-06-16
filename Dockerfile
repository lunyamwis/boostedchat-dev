# build stage
FROM node:18.16.0-buster-slim as build

RUN npm install -g pnpm

WORKDIR /code

COPY pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .
RUN pnpm store prune
RUN pnpm install -r

RUN pnpm run build

# prod stage
FROM nginx:1.22.1-alpine as prod

COPY --from=build /code/dist /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
