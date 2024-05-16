FROM node:20.13.1-alpine as build

ARG COMMIT_SHA=<not-specified>
ENV NODE_ENV=production

WORKDIR /build-dir

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN echo "mia_template_service_name_placeholder: $COMMIT_SHA" >> ./commit.sha

########################################################################################################################

FROM node:20.13.1-alpine

LABEL maintainer="%CUSTOM_PLUGIN_CREATOR_USERNAME%" \
      name="mia_template_service_name_placeholder" \
      description="%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%" \
      eu.mia-platform.url="https://www.mia-care.io" \
      eu.mia-platform.version="0.1.0"

RUN apk add --no-cache tini

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV SERVICE_PREFIX=/
ENV HTTP_PORT=3000

WORKDIR /home/node/app

COPY --from=build /build-dir ./

USER node

ENTRYPOINT ["/sbin/tini", "--"]

CMD ./node_modules/.bin/lc39 ./index.js --port=${HTTP_PORT} --log-level=${LOG_LEVEL} --expose-metrics=false