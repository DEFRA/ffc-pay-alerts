const { rpaEmailAddresses } = require('../../config')
const { rpaEvents } = require('../config')

const rpaEventFilterHandle = (event) => {
  if (rpaEvents.includes(event?.name)) {
    return rpaEmailAddresses.split(',').flat()
  }
  return []
}

module.exports = rpaEventFilterHandle
