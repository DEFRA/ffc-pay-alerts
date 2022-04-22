const validateMessage = require('./validate-message')
const { sendEmail } = require('./notify')

module.exports = async (context, mySbMsg) => {
  context.log('JavaScript ServiceBus topic trigger function received message', mySbMsg)
  await validateMessage(context, mySbMsg)
  await sendEmail(context, mySbMsg)
}
