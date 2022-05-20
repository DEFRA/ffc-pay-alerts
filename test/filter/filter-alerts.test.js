let filterEmailAddresses
let devHandler
let rpaHandler

let filteredEmailAddresses
let event

describe('filter email addresses by event', () => {
  beforeEach(() => {
    filteredEmailAddresses = []
    event = require('../mock-event')

    filterEmailAddresses = require('../../ffc-pay-alerts/filter/filter-alerts')

    jest.mock('../../ffc-pay-alerts/filter/handlers/dev-handler')
    devHandler = require('../../ffc-pay-alerts/filter/handlers/dev-handler')
    devHandler.mockImplementation(() => [])

    jest.mock('../../ffc-pay-alerts/filter/handlers/rpa-handler')
    rpaHandler = require('../../ffc-pay-alerts/filter/handlers/rpa-handler')
    rpaHandler.mockImplementation(() => [])
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  describe('unit test', () => {
    test('should call the devHandler with the default filteredEmailAddresses and the event when filterEmailAddresses is called with an event', async () => {
      event = 'payment-requests'

      filterEmailAddresses(event)

      expect(devHandler).toHaveBeenCalledWith([[], []], event)
    })

    // test('should call the devHandler when filterEmailAddresses is called with an event', async () => {
    //   event = 'payment-requests'

    //   filterEmailAddresses(event)

    //   expect(devHandler).toHaveBeenCalled()
    // })

    // test('should call the devHandler once when filterEmailAddresses is called with an event', async () => {
    //   event = 'payment-requests'

    //   filterEmailAddresses(event)

    //   expect(devHandler).toHaveBeenCalledTimes(1)
    // })

    // test('should call the devHandler with the default filteredEmailAddresses and the event when filterEmailAddresses is called with an event', async () => {
    //   event = 'payment-requests'

    //   filterEmailAddresses(event)
    //   // filterEmailAddresses internal array ain't reseting
    //   expect(devHandler).toHaveBeenCalledWith(filteredEmailAddresses, event)
    // })

    // test('should call the rpaHandler when filterEmailAddresses is called with an event', async () => {
    //   event = 'payment-requests'

    //   filterEmailAddresses(event)

    //   expect(rpaHandler).toHaveBeenCalled()
    // })

    // test('should call the rpaHandler once when filterEmailAddresses is called with an event', async () => {
    //   event = 'payment-requests'

    //   filterEmailAddresses(event)

    //   expect(rpaHandler).toHaveBeenCalledTimes(1)
    // })

    // test('should call the rpaHandler with the default filteredEmailAddresses and the event when filterEmailAddresses is called with an event', async () => {
    //   event = 'payment-requests'

    //   filterEmailAddresses(event)

    //   expect(rpaHandler).toHaveBeenCalledWith(filteredEmailAddresses, event)
    // })

    // test('should return a flat array of each handler with no null or undefined values when devHandler returns a flat array and rpaHandler returns an empty array', async () => {
    //   event = 'payment-requests'

    //   devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    //   rpaHandler.mockImplementation(() => [])

    //   const result = filterEmailAddresses(event)

    //   expect(result).toStrictEqual(['dev1@email', 'dev2@email'])
    // })

    // test('should return a flat array of each handler with no null or undefined values when devHandler returns an empty array and rpaHandler returns a flat array', async () => {
    //   event = 'finance'

    //   devHandler.mockImplementation(() => [])
    //   rpaHandler.mockImplementation(() => ['rpa1@email', 'rpa2@email'])

    //   const result = filterEmailAddresses(event)

    //   expect(result).toStrictEqual(['rpa1@email', 'rpa2@email'])
    // })

    // test('should return a flat array of each handler with no null or undefined values when devHandler returns a flat array and rpaHandler returns a flat array', async () => {
    //   event = 'shared'

    //   devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    //   rpaHandler.mockImplementation(() => ['rpa1@email', 'rpa2@email'])

    //   const result = filterEmailAddresses(event)

    //   expect(result).toStrictEqual(['dev1@email', 'dev2@email', 'rpa1@email', 'rpa2@email'])
    // })
  })
})
