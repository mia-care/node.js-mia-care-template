'use strict'

const { matchError, buildDecoratorErrorMessage } = require('../errors')
const { REMOTE_FETCHING_ERROR } = require('../constants')
const { Readable } = require('stream')

describe('test errorMatch', () => {
  const res = {
    sendValidationError: jest.fn(),
    sendAuthorizationError: jest.fn(),
    sendForbiddenError: jest.fn(),
    sendNotFoundError: jest.fn(),
    sendInternalServerError: jest.fn(),
    sendNotImplementedError: jest.fn(),
    sendServiceUnavailableError: jest.fn(),
  }

  beforeEach(async() => {
    jest.resetAllMocks()
  })

  it('test 400 error match', () => {
    const errorCode = 400
    const errorWithCode = new Error()
    errorWithCode.statusCode = errorCode
    matchError({}, res, errorWithCode)
    expect(res.sendValidationError).toHaveBeenCalledTimes(1)
    expect(res.sendAuthorizationError).not.toHaveBeenCalled()
    expect(res.sendForbiddenError).not.toHaveBeenCalled()
    expect(res.sendNotFoundError).not.toHaveBeenCalled()
    expect(res.sendInternalServerError).not.toHaveBeenCalled()
    expect(res.sendNotImplementedError).not.toHaveBeenCalled()
    expect(res.sendServiceUnavailableError).not.toHaveBeenCalled()
  })

  it('test 401 error match', () => {
    const errorCode = 401
    const errorWithCode = new Error()
    errorWithCode.statusCode = errorCode
    matchError({}, res, errorWithCode)
    expect(res.sendAuthorizationError).toHaveBeenCalledTimes(1)
  })

  it('test 403 error match', () => {
    const errorCode = 403
    const errorWithCode = new Error()
    errorWithCode.statusCode = errorCode
    matchError({}, res, errorWithCode)
    expect(res.sendForbiddenError).toHaveBeenCalledTimes(1)
  })

  it('test 404 error match', () => {
    const errorCode = 404
    const errorWithCode = new Error()
    errorWithCode.statusCode = errorCode
    matchError({}, res, errorWithCode)
    expect(res.sendNotFoundError).toHaveBeenCalledTimes(1)
  })

  it('test 500 error match', () => {
    const errorCode = 500
    const errorWithCode = new Error()
    errorWithCode.statusCode = errorCode
    matchError({}, res, errorWithCode)
    expect(res.sendInternalServerError).toHaveBeenCalledTimes(1)
  })

  it('test 501 error match', () => {
    const errorCode = 501
    const errorWithCode = new Error()
    errorWithCode.statusCode = errorCode
    matchError({}, res, errorWithCode)
    expect(res.sendNotImplementedError).toHaveBeenCalledTimes(1)
  })

  it('test 503 error match', () => {
    const errorCode = 503
    const errorWithCode = new Error()
    errorWithCode.statusCode = errorCode
    matchError({}, res, errorWithCode)
    expect(res.sendServiceUnavailableError).toHaveBeenCalledTimes(1)
  })

  it('test default case', () => {
    const req = {
      buildErrorResponse: jest.fn(),
    }

    const resWithSendAndCode = {
      send: jest.fn(),
      code: () => resWithSendAndCode,
      sendValidationError: jest.fn(),
      sendAuthorizationError: jest.fn(),
      sendForbiddenError: jest.fn(),
      sendNotFoundError: jest.fn(),
      sendInternalServerError: jest.fn(),
      sendNotImplementedError: jest.fn(),
      sendServiceUnavailableError: jest.fn(),
    }

    const errorWithoutCode = new Error()
    matchError(req, resWithSendAndCode, errorWithoutCode)
    expect(res.sendValidationError).not.toHaveBeenCalled()
    expect(res.sendAuthorizationError).not.toHaveBeenCalled()
    expect(res.sendForbiddenError).not.toHaveBeenCalled()
    expect(res.sendNotFoundError).not.toHaveBeenCalled()
    expect(res.sendInternalServerError).not.toHaveBeenCalled()
    expect(res.sendNotImplementedError).not.toHaveBeenCalled()
    expect(res.sendServiceUnavailableError).not.toHaveBeenCalled()
    expect(req.buildErrorResponse).toHaveBeenCalledTimes(1)
    expect(req.buildErrorResponse).toHaveBeenCalledWith(REMOTE_FETCHING_ERROR)
  })
})

describe(`test buildDecoratorErrorMessage`, () => {
  it(`buildDecoratorErrorMessage use default message`, async() => {
    const streamErrorMessage = 'stream error message'
    const errorMock = {
      payload: new Readable(),
    }
    errorMock.payload.push(streamErrorMessage)
    errorMock.payload.push(null)

    const message = await buildDecoratorErrorMessage(errorMock, 'default msg')
    expect(message).toBe(streamErrorMessage)
  })

  it(`buildDecoratorErrorMessage use payload as errro message`, async() => {
    const errorMock = {
      payload: undefined,
    }
    const defaultMsg = 'default msg'
    const message = await buildDecoratorErrorMessage(errorMock, defaultMsg)
    expect(message).toBe(defaultMsg)
  })
})
