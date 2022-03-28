module.exports = async function (context, mySbMsg) {
  context.log('JavaScript ServiceBus topic trigger function received message', mySbMsg)
}
