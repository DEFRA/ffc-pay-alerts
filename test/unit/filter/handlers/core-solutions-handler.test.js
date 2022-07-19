const coreSolutionsEventFilterHandle = require('../../../../ffc-pay-alerts/filter/handlers/core-solutions-handler')
const { CORE_SOLUTIONS_EVENT } = require('../../../mock-event')

const { coreSolutionsEmailAddresses } = require('../../../env')

let event
let splitCoreSolutionsEmailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    event = CORE_SOLUTIONS_EVENT
    splitCoreSolutionsEmailAddresses = coreSolutionsEmailAddresses.split(',').flat()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  test('should return splitCoreSolutionsEmailAddresses when an event matching the criteria is given', async () => {
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual(splitCoreSolutionsEmailAddresses)
  })

  test('should return an empty array when an event not matching the criteria is given', async () => {
    event = { name: 'not a matching criteria' }
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an empty event is given', async () => {
    event = {}
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of empty string is given', async () => {
    event = ''
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of string is given', async () => {
    event = 'not a valid event'
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of number is given', async () => {
    event = 1
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of boolean is given', async () => {
    event = true
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of undefined is given', async () => {
    event = undefined
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })

  test('should return an empty array when an incorrect event type of null is given', async () => {
    event = null
    const result = coreSolutionsEventFilterHandle(event)
    expect(result).toStrictEqual([])
  })
})
