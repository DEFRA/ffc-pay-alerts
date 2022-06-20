const templateSchema = require('../../schema/event-schema')
const { notifyEmailTemplateId } = require('../../config')

const getTemplateId = (message) => {
  const eventMatch = templateSchema.find(x => x.name === message?.name)
  return eventMatch ? eventMatch.notifyTemplateId : notifyEmailTemplateId
}

module.exports = getTemplateId
