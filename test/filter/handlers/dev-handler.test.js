const devHandler = require('../../../ffc-pay-alerts/filter/handlers/dev-handler')
const { devEvents } = require('../../../ffc-pay-alerts/filter/config')

let event
let filteredEmailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = require('../../mock-event')
    filteredEmailAddresses = []
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should return a flat string array when an empty filter array and an event matching the criteria are given', async () => {
    event = devEvents[0]

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return an empty array when an empty filter array and an event not matching the criteria are given', async () => {
    event = { a: 1 }

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an empty event are given', async () => {
    event = {}

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of empty string are given', async () => {
    event = ''

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of string are given', async () => {
    event = 'not-a-valid-value'

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of number are given', async () => {
    event = 1

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of boolean are given', async () => {
    event = true

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of undefined are given', async () => {
    event = undefined

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty filter array and an incorrect event type of null are given', async () => {
    event = null

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event matching the criteria are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = devEvents[0]

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event not matching the criteria are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = { a: 1 }

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an empty event are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = {}

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of empty string are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = ''

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of string are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = 'not-a-valid-value'

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of number are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = 1

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = true

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = undefined

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    filteredEmailAddresses = ['already', 'values']
    event = null

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values'])
  })

  test('should return a flat string array when a staggered pre-populated filter array and an event matching the criteria are given', async () => {
    filteredEmailAddresses = [['already'], 'values']
    event = devEvents[0]

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat string array when a nested pre-populated filter array and an event matching the criteria are given', async () => {
    filteredEmailAddresses = [['already'], ['values']]
    event = devEvents[0]

    const result = devHandler(filteredEmailAddresses, event)

    expect(result).toStrictEqual(['already', 'values', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })
})
