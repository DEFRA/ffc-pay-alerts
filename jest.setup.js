const envVars = require('./test/env')

process.env.NOTIFY_API_KEY = envVars.notifyApiKey
process.env.NOTIFY_EMAIL_TEMPLATE_ID = envVars.notifyEmailTemplateId
process.env.NOTIFY_EMAIL_ADDRESS = envVars.notifyEmailAddress
process.env.NOTIFY_EMAIL_ADDRESSES = envVars.notifyEmailAddresses
// https://github.com/facebook/jest/issues/8449#issuecomment-533557599
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
