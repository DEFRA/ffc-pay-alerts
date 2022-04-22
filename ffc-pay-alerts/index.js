const validateMessage = require('./validate-message')
const { sendEmails } = require('./notify')

module.exports = async (context, message) => {
  context.log('JavaScript ServiceBus topic trigger function received message', message)
  await validateMessage(context, message)
  await sendEmails(context, message)
}
