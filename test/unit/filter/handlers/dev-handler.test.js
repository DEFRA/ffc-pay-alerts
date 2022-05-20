const devHandler = require('../../../../ffc-pay-alerts/filter/handlers/dev-handler')
const { devEvents } = require('../../../../ffc-pay-alerts/filter/config')
const { ERROR_EVENT } = require('../../../mock-event')

let event

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = ERROR_EVENT
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should return a flat string array when an empty filter array and an event matching the criteria are given', async () => {
    const result = devHandler(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return an empty array when an empty filter array and an event not matching the criteria are given', async () => {
    event = { a: 1 }

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an empty event are given', async () => {
    event = {}

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of empty string are given', async () => {
    event = ''

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of string are given', async () => {
    event = 'not-a-valid-value'

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of number are given', async () => {
    event = 1

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of boolean are given', async () => {
    event = true

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of undefined are given', async () => {
    event = undefined

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of null are given', async () => {
    event = null

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event matching the criteria are given', async () => {
    const result = devHandler(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event not matching the criteria are given', async () => {
    event = { a: 1 }

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an empty event are given', async () => {
    event = {}

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of empty string are given', async () => {
    event = ''

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of string are given', async () => {
    event = 'not-a-valid-value'

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of number are given', async () => {
    event = 1

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    event = true

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    event = undefined

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    event = null

    const result = devHandler(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a staggered pre-populated filter array and an event matching the criteria are given', async () => {
    const result = devHandler(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat string array when a nested pre-populated filter array and an event matching the criteria are given', async () => {
    const result = devHandler(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })
})
