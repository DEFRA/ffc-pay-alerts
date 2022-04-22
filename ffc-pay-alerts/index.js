const validateMessage = require('./validate-message')
const { sendEmails } = require('./notify')

module.exports = async (context, mySbMsg) => {
  context.log('JavaScript ServiceBus topic trigger function received message', mySbMsg)
  await validateMessage(context, mySbMsg)
  await sendEmails(context, mySbMsg)
}
