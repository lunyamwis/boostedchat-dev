#!/bin/bash

imageId=$(docker compose images client | awk 'NR>1 {print $4}')
docker compose stop client
docker compose rm -f client
docker rmi $imageId -f
docker compose down
docker volume rm $(docker volume ls --format "{{.Name}}" | grep "_web-root") -f
docker pull lunyamwimages/boostedchatui-dev:latest
docker compose up -d