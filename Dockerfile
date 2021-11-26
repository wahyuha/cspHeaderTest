FROM node:lts-fermium
ARG CI_ENVIRONMENT_NAME
ENV CI_ENVIRONMENT_NAME=$CI_ENVIRONMENT_NAME
ADD . /app/sempu
WORKDIR /app/sempu

RUN npm install && npm run build-${CI_ENVIRONMENT_NAME}
EXPOSE 4019

CMD ["sh", "-c", "npm run ${CI_ENVIRONMENT_NAME}"]
