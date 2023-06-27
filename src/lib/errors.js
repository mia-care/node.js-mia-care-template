'use strict'

const { REMOTE_FETCHING_ERROR } = require('./constants')
const { streamToString } = require('./utils')

function matchError(req, res, error) {
  switch (error.statusCode) {
  case 400:
    res.sendValidationError(req, error)
    break
  case 401:
    res.sendAuthorizationError(req, error)
    break
  case 403:
    res.sendForbiddenError(req, error)
    break
  case 404:
    res.sendNotFoundError(req, error)
    break
  case 500:
    res.sendInternalServerError(req, error)
    break
  case 501:
    res.sendNotImplementedError(req, error)
    break
  case 503:
    res.sendServiceUnavailableError(req, error)
    break
  default:
    res.code(503).send(req.buildErrorResponse(REMOTE_FETCHING_ERROR))
  }
}

async function buildDecoratorErrorMessage(error, defaultMsg) {
  const { payload: errorMessage } = error
  const message = errorMessage ? await streamToString(errorMessage) : defaultMsg
  return message
}

module.exports = {
  matchError,
  buildDecoratorErrorMessage,
}
