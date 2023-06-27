/*
 * Copyright © 2022-present Mia s.r.l.
 * All rights reserved
 */
'use strict'

async function get(proxy, endpoint, queryParams, options, logger) {
  logger.debug(`Start ${proxy.serviceName} GET - ${endpoint}`)
  options.query = queryParams
  const { statusCode, payload } = await proxy.get(endpoint, options)

  if (statusCode < 200 || statusCode >= 300) {
    logger.error({ statusCode, payload }, `Failed ${proxy.serviceName} GET - ${endpoint} with code ${statusCode}`)
    const error = new Error(`${proxy.serviceName} GET ${endpoint} responded with a ${statusCode} status code`)
    error.statusCode = statusCode
    error.payload = payload
    throw error
  }

  logger.debug(`End ${proxy.serviceName} GET - ${endpoint}`)
  return payload
}

async function getById(proxy, endpoint, id, queryParams, logger) {
  logger.debug(`Start ${proxy.serviceName} GET BY ID - ${endpoint}`)

  const { statusCode, payload } = await proxy.get(`${endpoint}/${id}`, { query: queryParams })

  if (statusCode < 200 || statusCode >= 300) {
    logger.error({ statusCode, payload }, `Failed ${proxy.serviceName} GET BY ID - ${endpoint}/${id} with code ${statusCode}`)
    const error = new Error(`${proxy.serviceName} GET BY ID ${endpoint}/${id} responded with a ${statusCode} status code`)
    error.statusCode = statusCode
    error.payload = payload
    throw error
  }

  logger.debug(`End ${proxy.serviceName} GET BY ID - ${endpoint}`)
  return payload
}

async function post(proxy, endpoint, body, queryParams, options, logger) {
  logger.debug(`Start ${proxy.serviceName} POST - ${endpoint}`)
  options.query = queryParams
  const { statusCode, payload } = await proxy.post(endpoint, body, options)

  if (statusCode < 200 || statusCode >= 300) {
    logger.error({ statusCode, payload }, `Failed ${proxy.serviceName} POST - ${endpoint} with code ${statusCode}`)
    const error = new Error(`Failed ${proxy.serviceName} POST - ${endpoint} with code ${statusCode}`, payload)
    error.statusCode = statusCode
    error.payload = payload
    throw error
  }

  logger.debug(`End ${proxy.serviceName} POST - ${endpoint}`)
  return payload
}

async function patchById(proxy, endpoint, id, body, queryParams, logger) {
  logger.debug(`Start CRUD PATCH BY ID - ${endpoint}`)
  const { statusCode, payload } = await proxy.patch(`${endpoint}/${id}`, body, { query: queryParams }, {})

  if (statusCode < 200 || statusCode >= 300) {
    logger.error({ statusCode, payload }, `Failed CRUD PATCH BY ID - ${endpoint} with code ${statusCode}`)
    const error = new Error(`Failed ${proxy.serviceName} PATCH BY ID ${endpoint} with code ${statusCode}`)
    error.statusCode = statusCode
    throw error
  }

  logger.debug(`End CRUD PATCH BY ID - ${endpoint}`)
  return payload
}

async function patch(proxy, endpoint, body, queryParams, logger) {
  logger.debug(`Start CRUD PATCH - ${endpoint}`)
  const { statusCode, payload } = await proxy.patch(endpoint, body, { query: queryParams })

  if (statusCode < 200 || statusCode >= 300) {
    logger.error({ statusCode, payload }, `Failed CRUD PATCH - ${endpoint} with code ${statusCode}`)
    const error = new Error(`Failed ${proxy.serviceName} PATCH ${endpoint} with code ${statusCode}`)
    error.statusCode = statusCode
    throw error
  }

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
