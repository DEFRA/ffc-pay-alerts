const rpaHandler = require('../../../../ffc-pay-alerts/filter/handlers/rpa-handler')
const { MOCK_RPA_ONLY_EVENT } = require('../../../mock-event')

let event

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = MOCK_RPA_ONLY_EVENT
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should return a flat string array when an event matching the criteria is given', async () => {
    const result = rpaHandler(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return an empty array when an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty event is given', async () => {
    event = {}

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of empty string is given', async () => {
    event = ''

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of string is given', async () => {
    event = 'not a valid event'

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of number is given', async () => {
    event = 1

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of boolean is given', async () => {
    event = true

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of undefined is given', async () => {
    event = undefined

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of null is given', async () => {
    event = null

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event matching the criteria is given', async () => {
    const result = rpaHandler(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an empty event is given', async () => {
    event = {}

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of empty string is given', async () => {
    event = ''

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of string is given', async () => {
    event = 'not a valid event'

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of number is given', async () => {
    event = 1

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = true

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = undefined

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = null

    const result = rpaHandler(event)

    expect(result).toStrictEqual([])
  })
})
