const devHandler = require('./dev-handler')
const rpaHandler = require('./rpa-handler')

const handlers = {
  dev: devHandler,
  rpa: rpaHandler
}

module.exports = handlers
