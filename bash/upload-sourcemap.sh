#!/bin/bash

#get env value
while read -r line
do 
  if [[ $line != "" ]]
  then 
    declare "$line"
  fi
done <.env

VERSION=$(node -p "require('./package.json').version")

if [ $SENTRY_ENABLED = "true" ]; then
  SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN \
  SENTRY_ORG=$SENTRY_ORG \
  SENTRY_PROJECT=$SENTRY_PROJECT \
  node_modules/.bin/sentry-cli releases files $VERSION upload-sourcemaps __sapper__/build/client
fi