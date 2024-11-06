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

const stream = require('stream')

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

module.exports = {
  throwError,
  streamToString,
}
