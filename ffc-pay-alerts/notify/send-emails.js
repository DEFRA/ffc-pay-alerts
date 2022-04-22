const {
  notifyEmailAddresses
} = require('../config')

const sendEmail = require('./send-email')

const sendEmails = async (context, message, emailAddresses = notifyEmailAddresses, reference = '') => {
  const recipients = typeof (emailAddresses) === 'string' ? [emailAddresses] : emailAddresses

  for (const recipient of recipients) {
    await sendEmail(context, message, recipient, reference)
  }
}

module.exports = sendEmails
