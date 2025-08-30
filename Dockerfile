# Builder stage
FROM node:22-alpine AS build

WORKDIR /build-dir

COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev

COPY . .

RUN echo "mia_template_service_name_placeholder: $COMMIT_SHA" >> ./commit.sha

# Production (distroless) stage
FROM gcr.io/distroless/nodejs22-debian12

LABEL maintainer="%CUSTOM_PLUGIN_CREATOR_USERNAME%" \
      name="mia_template_service_name_placeholder" \
      description="%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%" \
      eu.mia-platform.url="https://www.mia-care.io" \
      eu.mia-platform.version="0.1.0"

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV SERVICE_PREFIX=/
ENV HTTP_PORT=3000

WORKDIR /home/node/app

COPY --from=build /build-dir ./

USER 65532

CMD ["./node_modules/.bin/lc39", "./index.js", "--port=${HTTP_PORT}", "--log-level=${LOG_LEVEL}", "--expose-metrics=false"]