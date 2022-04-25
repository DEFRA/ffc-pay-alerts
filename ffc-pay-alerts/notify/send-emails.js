const {
  notifyEmailAddresses
} = require('../config')

const sendEmail = require('./send-email')

const sendEmails = async (context, message, emailAddresses = notifyEmailAddresses, reference = '') => {
  // process.env.NOTIFY_EMAIL_ADDRESSES returns string, so splitting by comma to get array
  const recipients = typeof (emailAddresses) === 'string' ? emailAddresses.split(',') : emailAddresses

  for (const recipient of recipients) {
    await sendEmail(context, message, recipient, reference)
  }
}

module.exports = sendEmails
