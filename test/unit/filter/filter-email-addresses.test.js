let filterEmailAddresses
let devHandler
let debtEnrichmentHandler

let emailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    emailAddresses = []

    filterEmailAddresses = require('../../../ffc-pay-alerts/filter/filter-email-addresses')

    jest.mock('../../../ffc-pay-alerts/filter/handlers/dev-handler')
    devHandler = require('../../../ffc-pay-alerts/filter/handlers/dev-handler')
    devHandler.mockImplementation(() => [])

    jest.mock('../../../ffc-pay-alerts/filter/handlers/debt-enrichment-handler')
    debtEnrichmentHandler = require('../../../ffc-pay-alerts/filter/handlers/debt-enrichment-handler')
    debtEnrichmentHandler.mockImplementation(() => [])
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should call the devHandler when filterEmailAddresses is called with an event', async () => {
    filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above')

    expect(devHandler).toHaveBeenCalled()
  })

  test('should call the devHandler once when filterEmailAddresses is called with an event', async () => {
    filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above')

    expect(devHandler).toHaveBeenCalledTimes(1)
  })

  test('should call the debtEnrichmentHandler when filterEmailAddresses is called with an event', async () => {
    filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above')

    expect(debtEnrichmentHandler).toHaveBeenCalled()
  })

  test('should call the debtEnrichmentHandler once when filterEmailAddresses is called with an event', async () => {
    filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above')

    expect(debtEnrichmentHandler).toHaveBeenCalledTimes(1)
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with an event, devHandler returns a flat array and debtEnrichmentHandler returns an empty array', async () => {
    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    debtEnrichmentHandler.mockImplementation(() => [])

    const result = filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above')

    expect(result).toStrictEqual(['dev1@email', 'dev2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with an event, devHandler returns an empty array and debtEnrichmentHandler returns a flat array', async () => {
    devHandler.mockImplementation(() => [])
    debtEnrichmentHandler.mockImplementation(() => ['debtEnrichment1@email', 'debtEnrichment2@email'])

    const result = filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above')

    expect(result).toStrictEqual(['debtEnrichment1@email', 'debtEnrichment2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with an event, devHandler returns a flat array and debtEnrichmentHandler returns a flat array', async () => {
    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    debtEnrichmentHandler.mockImplementation(() => ['debtEnrichment1@email', 'debtEnrichment2@email'])

    const result = filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above')

    expect(result).toStrictEqual(['dev1@email', 'dev2@email', 'debtEnrichment1@email', 'debtEnrichment2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with emailAddresses and an event, devHandler returns a flat array and debtEnrichmentHandler returns an empty array', async () => {
    emailAddresses = ['before@email']

    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    debtEnrichmentHandler.mockImplementation(() => [])

    const result = filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above', emailAddresses)

    expect(result).toStrictEqual(['before@email', 'dev1@email', 'dev2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with emailAddresses and an event, devHandler returns an empty array and debtEnrichmentHandler returns a flat array', async () => {
    emailAddresses = ['before@email']

    devHandler.mockImplementation(() => [])
    debtEnrichmentHandler.mockImplementation(() => ['debtEnrichment1@email', 'debtEnrichment2@email'])

    const result = filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above', emailAddresses)

    expect(result).toStrictEqual(['before@email', 'debtEnrichment1@email', 'debtEnrichment2@email'])
  })

  test('should return a flat array of each handler with no null or undefined values when filterEmailAddresses is called with emailAddresses and an event, devHandler returns a flat array and debtEnrichmentHandler returns a flat array', async () => {
    emailAddresses = ['before@email']

    devHandler.mockImplementation(() => ['dev1@email', 'dev2@email'])
    debtEnrichmentHandler.mockImplementation(() => ['debtEnrichment1@email', 'debtEnrichment2@email'])

    const result = filterEmailAddresses('this doesn\'t matter, internal functions have been mocked above', emailAddresses)

    expect(result).toStrictEqual(['before@email', 'dev1@email', 'dev2@email', 'debtEnrichment1@email', 'debtEnrichment2@email'])
  })
})
