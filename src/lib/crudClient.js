/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */
'use strict'

const { join } = require('path')

function normalizePath(endpoint) {
  return endpoint.endsWith('/') ? endpoint : `${endpoint}/`
}

async function get(httpClient, endpoint, queryParams, options, logger) {
  logger.debug(`Start ${httpClient.serviceName} GET - ${endpoint}`)

  options.query = queryParams
  const { payload } = await httpClient.get(normalizePath(endpoint), options)

  logger.debug(`End ${httpClient.serviceName} GET - ${endpoint}`)
  return payload
}

async function getById(httpClient, endpoint, id, queryParams, logger) {
  logger.debug(`Start ${httpClient.serviceName} GET BY ID - ${endpoint}`)

  const { payload } = await httpClient.get(join(endpoint, id), { query: queryParams })

  logger.debug(`End ${httpClient.serviceName} GET BY ID - ${endpoint}`)
  return payload
}

async function post(httpClient, endpoint, body, queryParams, options, logger) {
  logger.debug(`Start ${httpClient.serviceName} POST - ${endpoint}`)

  options.query = queryParams
  const { payload } = await httpClient.post(normalizePath(endpoint), body, options)

  logger.debug(`End ${httpClient.serviceName} POST - ${endpoint}`)
  return payload
}

async function patchById(httpClient, endpoint, id, body, queryParams, logger) {
  logger.debug(`Start CRUD PATCH BY ID - ${endpoint}`)

  const { payload } = await httpClient.patch(join(endpoint, id), body, { query: queryParams }, {})

  logger.debug(`End CRUD PATCH BY ID - ${endpoint}`)
  return payload
}

async function patch(httpClient, endpoint, body, queryParams, logger) {
  logger.debug(`Start CRUD PATCH - ${endpoint}`)

  const { payload } = await httpClient.patch(normalizePath(endpoint), body, { query: queryParams })

  logger.debug(`End CRUD PATCH - ${endpoint}`)
  return payload
}


module.exports = {
  get,
  getById,
  post,
  patch,
  patchById,
}
