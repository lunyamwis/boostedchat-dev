#!/bin/sh
# for i in $(env | grep MY_APP_)
# do
#     key=$(echo $i | cut -d '=' -f 1)
#     value=$(echo $i | cut -d '=' -f 2-)
#     echo $key=$value
#     find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|${key}|${value}|g" '{}' +
# done


cd /usr/share/nginx/html

FILENAME=$(ls assets | grep ApiConstants)
# Remove trailing newline if any
FILENAME=$(echo $FILENAME | tr -d '\n')

# Use sed with the filename variable
sed -i "s/=[[:alnum:]]\+\.DOMAIN1/=\"$DOMAIN1\"/g" "./assets/$FILENAME"
sed -i "s/=[[:alnum:]]\+\.DOMAIN2/=\"$DOMAIN2\"/g" "./assets/$FILENAME"