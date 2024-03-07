# build stage
FROM node:18.15.0-buster-slim as build

# # Define build arguments for environment variables
# ARG DOMAIN1
# ARG DOMAIN2

# # Set environment variables during the build process
# ENV DOMAIN1=$DOMAIN1
# ENV DOMAIN2=$DOMAIN2

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
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
