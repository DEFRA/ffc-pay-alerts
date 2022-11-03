const formatEmailAddresses = (emailAddresses) => {
  const formatted = emailAddresses.replaceAll(' ', '')
  return formatted.split(',')
}

module.exports = formatEmailAddresses
