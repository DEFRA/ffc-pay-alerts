const { devEmailAddresses } = require('../../config')
const { devEvents } = require('../config')

const devEventFilterHandle = (filteredEmailAddresses, event) => {
  if (devEvents.includes(event)) {
    filteredEmailAddresses.push(devEmailAddresses.split(',').flat())
  }
  return filteredEmailAddresses.flat()
}

module.exports = devEventFilterHandle
