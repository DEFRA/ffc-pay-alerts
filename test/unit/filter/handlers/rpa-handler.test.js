const rpaHandler = require('../../../../ffc-pay-alerts/filter/handlers/rpa-handler')
const { RPA_EVENT } = require('../../../mock-event')

const { rpaEmailAddresses } = require('../../../env')

let event
let splitRpaEmailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = RPA_EVENT
    splitRpaEmailAddresses = rpaEmailAddresses.split(',').flat()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('should return a flat string array when an event matching the criteria is given', async () => {
    const result = rpaHandler(event)

    expect(result).toStrictEqual(splitRpaEmailAddresses)
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

    expect(result).toStrictEqual(splitRpaEmailAddresses)
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
