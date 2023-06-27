'use strict'

function decorateRequestWithBuildErrorResponse(service) {
  service.decorateRequest('buildErrorResponse', function _({ type, title }, ...otherProps) {
    return { type, title, ...otherProps, requestId: this.id }
  })
}

module.exports = {
  decorateRequestWithBuildErrorResponse,
}
