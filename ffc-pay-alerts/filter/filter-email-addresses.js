const eventFilterHandlers = require('./handlers')

const filterEmailAddresses = (event, emailAddresses = []) => {
  const filteredEmailAddresses = JSON.parse(JSON.stringify(emailAddresses))

  for (const handle of Object.values(eventFilterHandlers)) {
    filteredEmailAddresses.push(handle(event))
  }

  return filteredEmailAddresses.filter(x => x).flat()
}

module.exports = filterEmailAddresses
