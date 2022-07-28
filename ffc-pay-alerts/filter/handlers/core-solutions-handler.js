const { coreSolutionsEmailAddresses } = require('../../config')
const { coreSolutionsEvents } = require('../config')

const coreSolutionsEventFilterHandle = (event) => {
  if (coreSolutionsEvents.includes(event?.name)) {
    return coreSolutionsEmailAddresses.split(',').flat()
  }
  return []
}

module.exports = coreSolutionsEventFilterHandle
