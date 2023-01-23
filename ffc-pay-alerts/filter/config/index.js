const devEvents = require('./dev-events-config')
const debtEnrichmentEvents = require('./debt-enrichment-events-config')
const coreSolutionsEvents = require('./core-solutions-events-config')
const invalidBankDetailsEvents = require('./invalid-bank-details-events-config')

module.exports = {
  devEvents,
  debtEnrichmentEvents,
  coreSolutionsEvents,
  invalidBankDetailsEvents
}
