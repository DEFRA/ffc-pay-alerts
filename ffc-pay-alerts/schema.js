const Joi = require('joi')

module.exports = Joi.object({
  test: Joi.string().required()
})
