const devHandler = require('../../../../ffc-pay-alerts/filter/handlers/dev-handler')
const { DEV_EVENT } = require('../../../mock-event')

const { devEmailAddresses } = require('../../../env')

let event
let splitDevEmailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = DEV_EVENT
    splitDevEmailAddresses = devEmailAddresses.split(',').flat()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should return a flat string array when an event matching the criteria is given', async () => {
    const result = devHandler(event)

    expect(result).toStrictEqual(splitDevEmailAddresses)
  })

  test('should return an empty array when an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty event is given', async () => {
    event = {}

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of empty string is given', async () => {
    event = ''

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of string is given', async () => {
    event = 'not a valid event'

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of number is given', async () => {
    event = 1

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of boolean is given', async () => {
    event = true

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of undefined is given', async () => {
    event = undefined

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of null is given', async () => {
    event = null

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event matching the criteria is given', async () => {
    const result = devHandler(event)

    expect(result).toStrictEqual(splitDevEmailAddresses)
  })

  test('should return a flat string array when a flat pre-populated filter array and an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an empty event is given', async () => {
    event = {}

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of empty string is given', async () => {
    event = ''

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of string is given', async () => {
    event = 'not a valid event'

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of number is given', async () => {
    event = 1

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = true

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = undefined

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean is given', async () => {
    event = null

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })
})
