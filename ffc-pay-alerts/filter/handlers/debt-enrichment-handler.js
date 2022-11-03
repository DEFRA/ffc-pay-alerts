const { debtEnrichmentEmailAddresses } = require('../../config')
const { debtEnrichmentEvents } = require('../config')

const debtEnrichmentEventFilterHandle = (event) => {
  if (debtEnrichmentEvents.includes(event?.name)) {
    return debtEnrichmentEmailAddresses.split(',').flat()
  }
  return []
}

module.exports = debtEnrichmentEventFilterHandle
