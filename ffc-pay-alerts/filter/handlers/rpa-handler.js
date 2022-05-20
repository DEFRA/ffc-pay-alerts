const { rpaEmailAddresses } = require('../../config')
const { rpaEvents } = require('../config')

const rpaEventFilterHandle = (filteredEmailAddresses, event) => {
  if (rpaEvents.includes(event)) {
    filteredEmailAddresses.push(rpaEmailAddresses)
  }
  return filteredEmailAddresses
}

module.exports = rpaEventFilterHandle
