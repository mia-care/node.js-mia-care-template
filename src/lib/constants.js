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

const CHAT_USERS_ROLES = Object.freeze({
  PATIENT: 'patient',
  DOCTOR: 'doctor',
})

const REMOTE_FETCHING_ERROR = {
  type: 'ErrorRemoteFetching',
  title: 'Unexpected error. Try later or contact an admin.',
}

const AUDIT_TRAIL_HASHING_ALGORITHM = 'sha512'
const AUDIT_TRAIL_LOG_FIELD = 'auditLog'
const AUDIT_TRAIL_LOG_LEVEL = 1100
const AUDIT_TRAIL_VERSION = '1.0.0'

module.exports = {
  AUDIT_TRAIL_HASHING_ALGORITHM,
  AUDIT_TRAIL_LOG_FIELD,
  AUDIT_TRAIL_LOG_LEVEL,
  AUDIT_TRAIL_VERSION,
  CHAT_USERS_ROLES,
  REMOTE_FETCHING_ERROR,
}
