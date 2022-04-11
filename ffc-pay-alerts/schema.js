const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().required(),
  properties: Joi.object({
    id: Joi.string().required(),
    checkpoint: Joi.string().required(),
    status: Joi.string().required(),
    action: Joi.object({
      type: Joi.string().required(),
      message: Joi.string().required(),
      timestamp: Joi.date().required(),
      data: Joi.object()
    })
  })
})
