'use strict'

const {
  decorateReplyWithValidationError,
  decorateReplyWithAuthorizationError,
  decorateReplyWithForbiddenError,
  decorateReplyWithNotFoundError,
  decorateReplyWithInternalServerError,
  decorateReplyWithNotImplementedError,
  decorateReplyWithServiceUnavailableError,
} = require('./src/decorators/reply')

const { decorateRequestWithBuildErrorResponse } = require('./src/decorators/request')

const { envVarsSchema } = require('./src/schemas/envVarsSchema')
const customService = require('@mia-platform/custom-plugin-lib')(envVarsSchema)

const getHelloWorld = require('./src/endpoints/hello-world/get')

const { AUDIT_TRAIL_LOG_LEVEL } = require('./src/lib/constants')

module.exports = customService(async function index(service) {
  service.register(getHelloWorld)

  decorateReplyWithValidationError(service)
  decorateReplyWithAuthorizationError(service)
  decorateReplyWithForbiddenError(service)
  decorateReplyWithNotFoundError(service)
  decorateReplyWithInternalServerError(service)
  decorateReplyWithNotImplementedError(service)
  decorateReplyWithServiceUnavailableError(service)

  decorateRequestWithBuildErrorResponse(service)
})

module.exports.options = {
  logger: {
    customLevels: {
      audit: AUDIT_TRAIL_LOG_LEVEL,
    },
  },
}
