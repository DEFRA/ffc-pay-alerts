const { invalidBankDetailsEmailAddresses } = require('../../config')
const { invalidBankDetailsEvents } = require('../config')

const invalidBankDetailsEventFilterHandle = (event) => {
  if (invalidBankDetailsEvents.includes(event?.name)) {
    return invalidBankDetailsEmailAddresses.split(',').flat()
  }
  return []
}

module.exports = invalidBankDetailsEventFilterHandle
