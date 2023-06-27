/*
 * Copyright © 2023-present Mia s.r.l.
 * All rights reserved
 */
'use strict'

const envVarsSchema = {
  type: 'object',
  properties: {
    LOG_LEVEL: { type: 'string', default: 'info' },
  },
  required: [],
}

module.exports = { envVarsSchema }
