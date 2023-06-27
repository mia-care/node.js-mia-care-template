'use strict'

async function handler(request, reply) {
  reply.code(200).send({ status: 200, message: 'Hello World' })
}

module.exports = handler
