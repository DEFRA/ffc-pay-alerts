const devHandler = require('./dev-handler')
const debtEnrichmentHandler = require('./debt-enrichment-handler')
const coreSolutionsHandler = require('./core-solutions-handler')
const invalidBankDetailsHandler = require('./invalid-bank-details-handler')

const handlers = {
  dev: devHandler,
  debtEnrichment: debtEnrichmentHandler,
  coreSolutions: coreSolutionsHandler,
  invalidBankDetails: invalidBankDetailsHandler
}

module.exports = handlers
