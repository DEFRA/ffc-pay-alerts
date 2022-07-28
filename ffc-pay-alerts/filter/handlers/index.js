const devHandler = require('./dev-handler')
const rpaHandler = require('./rpa-handler')
const coreSolutionsHandler = require('./core-solutions-handler')

const handlers = {
  dev: devHandler,
  rpa: rpaHandler,
  coreSolutions: coreSolutionsHandler
}

module.exports = handlers
