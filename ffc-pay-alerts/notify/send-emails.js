const {
  notifyEmailAddresses
} = require('../config')
const formatEmailAddresses = require('./format-email-addresses')

const { v4: uuidv4 } = require('uuid')
const sendEmail = require('./send-email')

const sendEmails = async (context, message, emailAddresses = notifyEmailAddresses, reference = uuidv4()) => {
  // process.env.NOTIFY_EMAIL_ADDRESSES returns string, so splitting by comma to get array
  const recipients = typeof (emailAddresses) === 'string' ? formatEmailAddresses(emailAddresses) : emailAddresses

  for (const recipient of recipients) {
    try {
      await sendEmail(context, message, recipient, reference)
    } catch (err) {
      context.log(err)
    }
  }
}

module.exports = sendEmails
