const {
  devEvents,
  rpaEvents
} = require('../../ffc-pay-alerts/filter/config')

const filterEmailAddresses = require('../../ffc-pay-alerts/filter/filter-email-addresses')

let event
let emailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    emailAddresses = []
    event = require('../mock-event')
  })

  afterEach(() => {
    jest.resetModules()
  })

  test('should return a flat array of devEmailAddresses when an event matching the criteria for dev is given', async () => {
    event = devEvents[0]

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat array of rpaEmailAddresses when an event matching the criteria for rpa is given', async () => {
    event = rpaEvents[0]

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat array of devEmailAddresses and rpaEmailAddresses when an event matching the criteria for dev and rpa is given', async () => {
    event = 'other'

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual(['simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return an empty array when an event not matching the criteria for dev or rpa is given', async () => {
    event = { a: 'not a matching criteria' }

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty event is given', async () => {
    event = {}

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of empty string is given', async () => {
    event = ''

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of string is given', async () => {
    event = 'not-a-valid-value'

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of number is given', async () => {
    event = 1

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of boolean is given', async () => {
    event = true

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of undefined is given', async () => {
    event = undefined

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of null is given', async () => {
    event = null

    const result = filterEmailAddresses(event)

    expect(result).toStrictEqual([])
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an event matching the criteria for dev are given', async () => {
    event = devEvents[0]
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an event not matching the criteria are given', async () => {
    event = { a: 'not a matching criteria' }
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an empty event are given', async () => {
    event = {}
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of empty string are given', async () => {
    event = ''
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of string are given', async () => {
    event = 'not-a-valid-value'
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of number are given', async () => {
    event = 1
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    event = true
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    event = undefined
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a flat pre-populated filter array and an incorrect event type of boolean are given', async () => {
    event = null
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email'])
  })

  test('should return a flat string array when a staggered pre-populated filter array and an event matching the criteria are given', async () => {
    event = devEvents[0]
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })

  test('should return a flat string array when a nested pre-populated filter array and an event matching the criteria for dev are given', async () => {
    event = devEvents[0]
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(['already@email', 'given@email', 'simulate-delivered@notifications.service.gov.uk', 'simulate-delivered@notifications.service.gov.uk'])
  })
})
