'use strict'

async function handler(request, reply) {
  request.log.audit({ event: 'MiaCare/HelloWorld/v1' }, 'Hello World Audit Log')
  reply.code(200).send({ status: 200, message: 'Hello World' })
}

module.exports = handler
