const {
  notifyEmailAddresses
} = require('../config')

const { v4: uuidv4 } = require('uuid')
const sendEmail = require('./send-email')

const sendEmails = async (context, message, emailAddresses = notifyEmailAddresses, reference = uuidv4()) => {
  // process.env.NOTIFY_EMAIL_ADDRESSES returns string, so splitting by comma to get array
  const recipients = typeof (emailAddresses) === 'string' ? formatEmailAddresses(emailAddresses) : emailAddresses
  console.log(recipients)

  for (const recipient of recipients) {
    try {
      await sendEmail(context, message, recipient, reference)
    } catch (err) {
      context.log(err)
    }
  }
}

module.exports = sendEmails

const formatEmailAddresses = (emailAddresses) => {
  const formatted = emailAddresses.replaceAll(' ', '')
  const array = formatted.split(',')
  console.log('array', array)
  return array
}
