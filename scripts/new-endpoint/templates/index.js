'use strict'

const schema = require('./schema')
const handler = require('./handler')

module.exports = function plugin(fastify, opts, next) {
  registerRoute(fastify)

  next()
}

function registerRoute(fastify) {
  fastify.addRawCustomPlugin('{{METHOD}}', '{{ENDPOINT}}', handler, schema)
}
