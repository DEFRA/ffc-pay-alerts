const flatten = require('flat')
const { v4: uuidv4 } = require('uuid')
const {
  notifyApiKey,
  notifyEmailTemplateId,
  notifyEmailAddress
} = require('../config')

const validateEmail = require('./validate-email')

const NotifyClient = require('notifications-node-client').NotifyClient
const notifyClient = new NotifyClient(notifyApiKey)

const sendEmail = async (context, message, emailAddress = notifyEmailAddress, reference = uuidv4()) => {
  try {
    await validateEmail(context, emailAddress)
    await notifyClient.sendEmail(notifyEmailTemplateId, emailAddress, {
      personalisation: flatten(message),
      reference
    })
    context.log(`Email sent to ${emailAddress} containing `, message)
  } catch (err) {
    const errMessage = `Oh dear. ${err}`
    throw new Error(errMessage)
  }
}

module.exports = sendEmail
