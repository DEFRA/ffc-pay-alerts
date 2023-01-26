const devHandler = require('./dev-handler')
const debtEnrichmentHandler = require('./debt-enrichment-handler')
const coreSolutionsHandler = require('./core-solutions-handler')

const handlers = {
  dev: devHandler,
  debtEnrichment: debtEnrichmentHandler,
  coreSolutions: coreSolutionsHandler
}

module.exports = handlers
