/*
 * Copyright © 2023-present Mia s.r.l.
 * All rights reserved
 */

'use strict'

const lc39 = require('@mia-platform/lc39')

const defaultEnvVariables = {
  USERID_HEADER_KEY: 'miauserid',
  GROUPS_HEADER_KEY: 'groups',
  CLIENTTYPE_HEADER_KEY: 'client-type',
  BACKOFFICE_HEADER_KEY: 'backoffice',
  MICROSERVICE_GATEWAY_SERVICE_NAME: 'microservice-gateway.example.org',
}

async function setupFastify(envVariables) {
  const fastify = await lc39('./index.js', {
    logLevel: 'silent',
    envVariables: {
      ...defaultEnvVariables,
      ...envVariables,
    },
  })
  return fastify
}

module.exports = {
  setupFastify,
}
