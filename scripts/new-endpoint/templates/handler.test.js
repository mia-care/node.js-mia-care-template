'use strict'

const nock = require('nock')

const { setupFastify } = require('../../../../../tests/setup')

nock.emitter.on('no match', req => {
  const { path, method, requestBodyBuffers, options: { headers } } = req
  throw new Error(`No match ${method}\nheaders: ${JSON.stringify(headers)}\npath: ${path}\nbody: ${requestBodyBuffers.toString()}`)
})

describe('{{METHOD}} {{ENDPOINT}} Test Suite', () => {
  let fastify

  beforeEach(async() => {
    fastify = await setupFastify()
  })

  afterEach(async() => {
    await fastify.close()
    nock.cleanAll()
  })

  it('Example test', () => {
    expect(true).toBe(true)
  })
})
