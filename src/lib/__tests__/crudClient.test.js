/*
 * Copyright © 2023-present Mia s.r.l.
 * All rights reserved
 */
'use strict'

const loggerMock = require('abstract-logging')
const crudClient = require('../crudClient')

describe('crudClient', () => {
  describe('get', () => {
    it('throws if the service returns a status < 200 or >= 300', async() => {
      const serviceMock = {
        get() {
          return Promise.resolve({ statusCode: 400, payload: { message: 'General error' } })
        },
        serviceName: 'name',
      }
      try {
        await crudClient.get(serviceMock, '/test', {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('name GET /test responded with a 400 status code')
      }
    })

    it('throws if the service throws', async() => {
      const serviceMock = {
        get() {
          throw new Error('error')
        },
        serviceName: 'name',
      }

      try {
        await crudClient.get(serviceMock, '/test', {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('error')
      }
    })

    it('returns the payload if the call has success', async() => {
      const mockPayload = { data: 'test' }
      const serviceMock = {
        get() {
          return Promise.resolve({ statusCode: 200, payload: mockPayload })
        },
        serviceName: 'name',
      }

      const response = await crudClient.get(serviceMock, '/test', {}, {}, loggerMock)

      expect(response).toEqual(mockPayload)
    })
  })

  describe('getById', () => {
    it('throws if the service returns a status < 200 or >= 300', async() => {
      const serviceMock = {
        get() {
          return Promise.resolve({ statusCode: 400, payload: { msg: 'Error' } })
        },
        serviceName: 'CRUD',
      }

      try {
        await crudClient.getById(serviceMock, '/orders', '1234', {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('CRUD GET BY ID /orders/1234 responded with a 400 status code')
      }
    })

    it('throws if the service throws', async() => {
      const serviceMock = {
        get() {
          throw new Error('error')
        },
      }

      try {
        await crudClient.getById(serviceMock, '/orders', '1234', {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('error')
      }
    })

    it('returns the payload if the call has success', async() => {
      const mockPayload = { data: 'test' }
      const serviceMock = {
        get() {
          return Promise.resolve({ statusCode: 200, payload: mockPayload })
        },
      }

      const response = await crudClient.getById(serviceMock, '/orders', '1234', {}, loggerMock)

      expect(response).toEqual(mockPayload)
    })
  })

  describe('post', () => {
    it('throws if the service returns a status < 200 or >= 300', async() => {
      const serviceMock = {
        post() {
          return Promise.resolve({ statusCode: 400, payload: { message: 'General error' } })
        },
        serviceName: 'name',
      }
      try {
        await crudClient.post(serviceMock, '/send', {}, {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('Failed name POST - /send with code 400')
      }
    })

    it('throws if the service throws', async() => {
      const serviceMock = {
        post() {
          throw new Error('error')
        },
        serviceName: 'name',
      }

      try {
        await crudClient.post(serviceMock, '/send', {}, {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('error')
      }
    })

    it('returns the payload if the call has success', async() => {
      const mockPayload = { data: 'test' }
      const serviceMock = {
        post() {
          return Promise.resolve({ statusCode: 200, payload: mockPayload })
        },
        serviceName: 'name',
      }

      const response = await crudClient.post(serviceMock, '/send', {}, {}, {}, loggerMock)

      expect(response).toEqual(mockPayload)
    })
  })

  describe('patch', () => {
    it('throws if the service returns a status < 200 or >= 300', async() => {
      const serviceMock = {
        patch() {
          return Promise.resolve({ statusCode: 400, payload: { message: 'General error' } })
        },
        serviceName: 'name',
      }
      try {
        await crudClient.patch(serviceMock, '/test', {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('Failed name PATCH /test with code 400')
      }
    })

    it('throws if the service throws', async() => {
      const serviceMock = {
        patch() {
          throw new Error('error')
        },
      }

      try {
        await crudClient.patch(serviceMock, '/test', {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('error')
      }
    })

    it('returns the payload if the call has success', async() => {
      const mockPayload = { data: 'test' }
      const serviceMock = {
        patch() {
          return Promise.resolve({ statusCode: 200, payload: mockPayload })
        },
      }

      const response = await crudClient.patch(serviceMock, '/test', {}, {}, loggerMock)

      expect(response).toEqual(mockPayload)
    })
  })


  describe('patchById', () => {
    it('throws if the service returns a status < 200 or >= 300', async() => {
      const serviceMock = {
        patch() {
          return Promise.resolve({ statusCode: 400, payload: { msg: 'Error' } })
        },
        serviceName: 'name',
      }
      try {
        await crudClient.patchById(serviceMock, '/orders', 'id', {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('Failed name PATCH BY ID /orders with code 400')
      }
    })

    it('throws if the service throws', async() => {
      const serviceMock = {
        patch() {
          throw new Error('error')
        },
      }

      try {
        await crudClient.patchById(serviceMock, '/orders', 'id', {}, {}, loggerMock)
      } catch (error) {
        expect(error.message).toEqual('error')
      }
    })

    it('returns the payload if the call has success', async() => {
      const mockPayload = { data: 'test' }
      const serviceMock = {
        patch() {
          return Promise.resolve({ statusCode: 200, payload: mockPayload })
        },
      }

      const response = await crudClient.patchById(serviceMock, '/orders', 'id', {}, {}, loggerMock)

      expect(response).toEqual(mockPayload)
    })
  })
})
