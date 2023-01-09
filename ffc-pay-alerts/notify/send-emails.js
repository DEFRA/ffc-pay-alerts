const { v4: uuidv4 } = require('uuid')
const { notifyEmailAddresses } = require('../config')
const formatEmailAddresses = require('./format-email-addresses')
const sendEmail = require('./send-email')

const sendEmails = async (context, message, emailAddresses = notifyEmailAddresses, reference = uuidv4()) => {
  const recipients = formatEmailAddresses(emailAddresses)

  for (const recipient of recipients) {
    try {
      await sendEmail(context, message, recipient, reference)
    } catch (err) {
      context.log(err)
    }
  }
}

module.exports = sendEmails
