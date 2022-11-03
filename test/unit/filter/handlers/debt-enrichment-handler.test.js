const debtEnrichmentHandler = require('../../../../ffc-pay-alerts/filter/handlers/debt-enrichment-handler')
const { DEBT_ENRICHMENT_EVENT } = require('../../../mock-event')

const { debtEnrichmentEmailAddresses } = require('../../../env')

let event
let splitDebtEnrichmentEmailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = DEBT_ENRICHMENT_EVENT
    splitDebtEnrichmentEmailAddresses = debtEnrichmentEmailAddresses.split(',').flat()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('should return a flat string array when an event matching the criteria is given', async () => {
    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual(splitDebtEnrichmentEmailAddresses)
  })

  test('should return an empty array when an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty event is given', async () => {
    event = {}

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of empty string is given', async () => {
    event = ''

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of string is given', async () => {
    event = 'not a valid event'

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of number is given', async () => {
    event = 1

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of boolean is given', async () => {
    event = true

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of undefined is given', async () => {
    event = undefined

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of null is given', async () => {
    event = null

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event matching the criteria is given', async () => {
    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual(splitDebtEnrichmentEmailAddresses)
  })

  test('should return a flat string array when a flat pre-populated filter array and an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an empty event is given', async () => {
    event = {}

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of empty string is given', async () => {
    event = ''

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of string is given', async () => {
    event = 'not a valid event'

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of number is given', async () => {
    event = 1

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = true

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = undefined

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = null

    const result = debtEnrichmentHandler(event)

    expect(result).toStrictEqual([])
  })
})
