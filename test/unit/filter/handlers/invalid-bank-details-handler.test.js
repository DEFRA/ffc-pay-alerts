const invalidBankDetailsHandler = require('../../../../ffc-pay-alerts/filter/handlers/invalid-bank-details-handler')
const { INVALID_BANK_DETAILS_EVENT } = require('../../../mock-event')

const { invalidBankDetailsEmailAddresses } = require('../../../env')

let event
let splitInvalidBankDetailsEmailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = INVALID_BANK_DETAILS_EVENT
    splitInvalidBankDetailsEmailAddresses = invalidBankDetailsEmailAddresses.split(',').flat()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should return splitInvalidBankDetailsEmailAddresses when an event matching the criteria is given', async () => {
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual(splitInvalidBankDetailsEmailAddresses)
  })

  test('should return an empty array when an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty event is given', async () => {
    event = {}
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of empty string is given', async () => {
    event = ''
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of string is given', async () => {
    event = 'not a valid event'
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of number is given', async () => {
    event = 1
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of boolean is given', async () => {
    event = true
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of undefined is given', async () => {
    event = undefined
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of null is given', async () => {
    event = null
    const result = invalidBankDetailsHandler(event)
    expect(result).toStrictEqual([])
  })
})
