const formatEmailAddresses = (emailAddresses) => {
  if (typeof (emailAddresses) === 'string') {
    // process.env.NOTIFY_EMAIL_ADDRESSES returns string, so splitting by comma to get array
    emailAddresses = emailAddresses.split(',')
  }
  return emailAddresses.map(email => email.replace(/^\s+|\s+$/gm, ''))
}

module.exports = formatEmailAddresses
