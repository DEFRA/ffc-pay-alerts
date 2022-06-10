const templateSchema = require('../../schema/event-schema')
const { notifyEmailTemplateId } = require('../../config')

const getTemplateId = (message) => {
  const eventMatch = templateSchema.find(x => x.eventType === message?.properties?.action?.type)
  return eventMatch ? eventMatch.notifyTemplateId : notifyEmailTemplateId
}

module.exports = getTemplateId
