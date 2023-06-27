'use strict'

const nock = require('nock')

const { setupFastify } = require('../../../../../tests/setup')

nock.emitter.on('no match', req => {
  const { path, method, requestBodyBuffers, options: { headers } } = req
  throw new Error(`No match ${method}\nheaders: ${JSON.stringify(headers)}\npath: ${path}\nbody: ${requestBodyBuffers.toString()}`)
})

describe('GET /hello-world Test Suite', () => {
  let fastify

  beforeEach(async() => {
    fastify = await setupFastify()
  })

  afterEach(async() => {
    await fastify.close()
    nock.cleanAll()
  })

  it('Happy path', async() => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/hello-world',
    })

    const expectedResponse = {
      status: 200,
      message: 'Hello World',
    }

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload)).toStrictEqual(expectedResponse)
  })
})
