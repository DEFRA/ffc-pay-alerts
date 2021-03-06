const { devEmailAddresses } = require('../../config')
const { devEvents } = require('../config')

const devEventFilterHandle = (event) => {
  if (devEvents.includes(event?.name)) {
    return devEmailAddresses.split(',').flat()
  }
  return []
}

module.exports = devEventFilterHandle
