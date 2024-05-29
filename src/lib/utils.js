/*
* Copyright 2023 Mia srl
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict'

const { createHash } = require('crypto')
const stream = require('stream')

const { AUDIT_TRAIL_LOG_LEVEL, AUDIT_TRAIL_HASHING_ALGORITHM, AUDIT_TRAIL_VERSION, AUDIT_TRAIL_LOG_FIELD } = require('./constants')

function throwError(logger, message, code) {
  logger.error({ error: { message } }, message)
  const error = new Error(message)
  error.statusCode = code
  throw error
}

function streamToString(objectToConvert) {
  if (!(objectToConvert instanceof stream.Readable)) { return JSON.stringify(objectToConvert) }
  const chunks = []
  return new Promise((resolve, reject) => {
    objectToConvert.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    objectToConvert.on('error', (error) => reject(error))
    objectToConvert.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

function logMethod(inputArgs, method, level) {
  if (level === AUDIT_TRAIL_LOG_LEVEL && inputArgs.length >= 2) {
    const object = inputArgs.shift()
    const message = inputArgs.shift()
    const auditObject = {
      [AUDIT_TRAIL_LOG_FIELD]: {
        version: AUDIT_TRAIL_VERSION,
        timestamp: new Date().toISOString(),
        checksum: {
          algorithm: AUDIT_TRAIL_HASHING_ALGORITHM,
          value: createHash(AUDIT_TRAIL_HASHING_ALGORITHM)
            .update(JSON.stringify(object))
            .digest('hex'),
        },
        metadata: object,
        message,
      },
    }
    return method.apply(this, [auditObject, message, ...inputArgs])
  }
  return method.apply(this, inputArgs)
}

module.exports = {
  throwError,
  streamToString,
  logMethod,
}
