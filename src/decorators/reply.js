'use strict'

const { buildDecoratorErrorMessage } = require('../lib/errors')

function decorateReplyWithValidationError(service) {
  service.decorateReply('sendValidationError', async function sendValidationError(request, error) {
    const code = 400
    const message = await buildDecoratorErrorMessage(error, 'Bad request')
    request.log.error({ error }, message)
    this.code(code)
    this.send({
      statusCode: code,
      error: 'Validation Error',
      message,
      requestId: request.id,
    })
  })
}

function decorateReplyWithAuthorizationError(service) {
  service.decorateReply('sendAuthorizationError', async function sendAuthorizationError(request, error) {
    const code = 401
    const message = await buildDecoratorErrorMessage(error, 'Unauthorized')
    request.log.error({ error }, message)
    this.code(code)
    this.send({
      statusCode: code,
      error: 'Authorization Error',
      message,
      requestId: request.id,
    })
  })
}

function decorateReplyWithForbiddenError(service) {
  service.decorateReply('sendForbiddenError', async function sendForbiddenError(request, error) {
    const code = 403
    const message = await buildDecoratorErrorMessage(error, 'Forbidden')
    request.log.error({ error }, message)
    this.code(code)
    this.send({
      statusCode: code,
      error: 'Permission Error',
      message,
      requestId: request.id,
    })
  })
}

function decorateReplyWithNotFoundError(service) {
  service.decorateReply('sendNotFoundError', async function sendNotFoundError(request, error) {
    const code = 404
    const message = await buildDecoratorErrorMessage(error, 'Not found')
    request.log.error({ error }, message)
    this.code(code)
    this.send({
      statusCode: code,
      error: 'Not Found Error',
      message,
      requestId: request.id,
    })
  })
}

function decorateReplyWithInternalServerError(service) {
  service.decorateReply('sendInternalServerError', async function sendInternalServerError(request, error) {
    const code = 500
    const message = await buildDecoratorErrorMessage(error, 'Internal Server Error')
    request.log.error({ error }, message)
    this.code(code)
    this.send({
      statusCode: code,
      error: 'Internal Server Error',
      message,
      requestId: request.id,
    })
  })
}

function decorateReplyWithNotImplementedError(service) {
  service.decorateReply('sendNotImplementedError', async function sendInternalServerError(request, error) {
    const code = 501
    const message = await buildDecoratorErrorMessage(error, 'Not implemented')
    request.log.error({ error }, message)
    this.code(code)
    this.send({
      statusCode: code,
      error: 'Not Implemented Error',
      message,
      requestId: request.id,
    })
  })
}

function decorateReplyWithServiceUnavailableError(service) {
  service.decorateReply('sendServiceUnavailableError', async function sendInternalServerError(request, error) {
    const code = 503
    const message = await buildDecoratorErrorMessage(error, 'Service Unavailable')
    request.log.error({ error }, message)
    this.code(code)
    this.send({
      statusCode: code,
      error: 'Service Unavailable Error',
      message,
      requestId: request.id,
    })
  })
}

module.exports = {
  decorateReplyWithAuthorizationError,
  decorateReplyWithForbiddenError,
  decorateReplyWithInternalServerError,
  decorateReplyWithNotFoundError,
  decorateReplyWithNotImplementedError,
  decorateReplyWithServiceUnavailableError,
  decorateReplyWithValidationError,
}
