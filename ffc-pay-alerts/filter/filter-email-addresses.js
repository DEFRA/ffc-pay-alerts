const eventFilterHandlers = require('./handlers')

const filterEmailAddresses = (event, emailAddresses = []) => {
  const filteredEmailAddresses = [...emailAddresses]

  for (const handle of Object.values(eventFilterHandlers)) {
    filteredEmailAddresses.push(handle(filteredEmailAddresses, event))
  }

  return filteredEmailAddresses.filter(x => x).flat()
}

module.exports = filterEmailAddresses
