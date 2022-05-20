let filterEmailAddresses
let devHandler
let rpaHandler

let emailAddresses
let event

describe('filter email addresses by event', () => {
  beforeEach(() => {
    emailAddresses = []
    event = require('../../mock-event')

    filterEmailAddresses = require('../../../ffc-pay-alerts/filter/filter-email-addresses')

    jest.mock('../../../ffc-pay-alerts/filter/handlers/dev-handler')
    devHandler = require('../../../ffc-pay-alerts/filter/handlers/dev-handler')
    devHandler.mockImplementation(() => [])

    jest.mock('../../../ffc-pay-alerts/filter/handlers/rpa-handler')
    rpaHandler = require('../../../ffc-pay-alerts/filter/handlers/rpa-handler')
    rpaHandler.mockImplementation(() => [])
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should call the devHandler when filterEmailAddresses is called with an event', async () => {
    event = 'payment-requests'

    filterEmailAddresses(event)

    expect(devHandler).toHaveBeenCalled()
  })

  test('should call the devHandler once when filterEmailAddresses is called with an event', async () => {
    event = 'payment-requests'

    filterEmailAddresses(event)

    expect(devHandler).toHaveBeenCalledTimes(1)
  })

  test('should call the rpaHandler when filterEmailAddresses is called with an event', async () => {
    event = 'payment-requests'

    filterEmailAddresses(event)

    expect(rpaHandler).toHaveBeenCalled()
  })

  test('should call the rpaHandler once when filterEmailAddresses is called with an event', async () => {
    event = 'payment-requests'

    filterEmailAddresses(event)

    expect(rpaHandler).toHaveBeenCalledTimes(1)
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with an event, devHandler returns a flat array and rpaHandler returns an empty array', async () => {
    event = 'payment-requests'

    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    rpaHandler.mockImplementation(() => [])

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual(['dev1@email', 'dev2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with an event, devHandler returns an empty array and rpaHandler returns a flat array', async () => {
    event = 'finance'

    devHandler.mockImplementation(() => [])
    rpaHandler.mockImplementation(() => ['rpa1@email', 'rpa2@email'])

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual(['rpa1@email', 'rpa2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with an event, devHandler returns a flat array and rpaHandler returns a flat array', async () => {
    event = 'shared'

    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    rpaHandler.mockImplementation(() => ['rpa1@email', 'rpa2@email'])

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual(['dev1@email', 'dev2@email', 'rpa1@email', 'rpa2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with emailAddresses and an event, devHandler returns a flat array and rpaHandler returns an empty array', async () => {
    emailAddresses = ['before@email']
    event = 'payment-requests'

    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    rpaHandler.mockImplementation(() => [])

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['before@email', 'dev1@email', 'dev2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with emailAddresses and an event, devHandler returns an empty array and rpaHandler returns a flat array', async () => {
    emailAddresses = ['before@email']
    event = 'finance'

    devHandler.mockImplementation(() => [])
    rpaHandler.mockImplementation(() => ['rpa1@email', 'rpa2@email'])

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['before@email', 'rpa1@email', 'rpa2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with emailAddresses and an event, devHandler returns a flat array and rpaHandler returns a flat array', async () => {
    emailAddresses = ['before@email']
    event = 'shared'

    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    rpaHandler.mockImplementation(() => ['rpa1@email', 'rpa2@email'])

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['before@email', 'dev1@email', 'dev2@email', 'rpa1@email', 'rpa2@email'])
  })
})
