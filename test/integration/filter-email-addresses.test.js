const {
  DEBT_ENRICHMENT_EVENT,
  DEV_EVENT,
  CORE_SOLUTIONS_EVENT,
  DEV_AND_DEBT_ENRICHMENT_EVENT
} = require('../mock-event')

const {
  devEmailAddresses,
  debtEnrichmentEmailAddresses,
  coreSolutionsEmailAddresses
} = require('../env')

const filterEmailAddresses = require('../../ffc-pay-alerts/filter/filter-email-addresses')

let event
let splitDevEmailAddresses
let splitDebtEnrichmentEmailAddresses
let splitCoreSolutionsEmailAddresses
let emailAddresses

describe('filter email addresses by event', () => {
  beforeEach(() => {
    emailAddresses = []
    splitDevEmailAddresses = devEmailAddresses.split(',').flat()
    splitDebtEnrichmentEmailAddresses = debtEnrichmentEmailAddresses.split(',').flat()
    splitCoreSolutionsEmailAddresses = coreSolutionsEmailAddresses.split(',').flat()
  })

  afterEach(() => {
    jest.resetModules()
  })

  test('should return a flat array of devEmailAddresses when an event matching the criteria for dev is given', async () => {
    const result = filterEmailAddresses(DEV_EVENT)

    expect(result).toStrictEqual(splitDevEmailAddresses)
  })

  test('should return a flat array of debtEnrichmentEmailAddresses when an event matching the criteria for debt enrichment is given', async () => {
    const result = filterEmailAddresses(DEBT_ENRICHMENT_EVENT)

    expect(result).toStrictEqual(splitDebtEnrichmentEmailAddresses)
  })

  test('should return a flat array of coreSolutionsEmailAddresses when an event matching the criteria for core solutions is given', async () => {
    const result = filterEmailAddresses(CORE_SOLUTIONS_EVENT)
    expect(result).toStrictEqual(splitCoreSolutionsEmailAddresses)
  })

  test('should return a flat array of devEmailAddresses and debtEnrichmentEmailAddresses when an event matching the criteria for dev and debt enrichment is given', async () => {
    const result = filterEmailAddresses(DEV_AND_DEBT_ENRICHMENT_EVENT)

    expect(result).toStrictEqual([...splitDevEmailAddresses, ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return an empty array when an event not matching any criteria is given', async () => {
    event = { name: 'not a matching criteria' }

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
    event = 'not a valid event'

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
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(DEV_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses, ...splitDevEmailAddresses])
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an event matching the criteria for debt enrichment are given', async () => {
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(DEBT_ENRICHMENT_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses, ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an event matching the criteria for dev and debt enrichment are given', async () => {
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(DEV_AND_DEBT_ENRICHMENT_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses, ...splitDevEmailAddresses, ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an event not matching any criteria are given', async () => {
    event = { name: 'not a matching criteria' }
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an empty event are given', async () => {
    event = {}
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an incorrect event type of empty string are given', async () => {
    event = ''
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an incorrect event type of string are given', async () => {
    event = 'not a valid value'
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an incorrect event type of number are given', async () => {
    event = 1
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an incorrect event type of boolean are given', async () => {
    event = true
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an incorrect event type of boolean are given', async () => {
    event = undefined
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a flat pre-populated emailAddresses array and an incorrect event type of boolean are given', async () => {
    event = null
    emailAddresses = ['already@email', 'given@email']

    const result = filterEmailAddresses(event, emailAddresses)

    expect(result).toStrictEqual(emailAddresses)
  })

  test('should return a flat string array when a staggered pre-populated emailAddresses array and an event matching the criteria of dev are given', async () => {
    emailAddresses = [['already@email'], 'given@email']

    const result = filterEmailAddresses(DEV_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses.flat(), ...splitDevEmailAddresses])
  })

  test('should return a flat string array when a nested pre-populated emailAddresses array and an event matching the criteria for dev are given', async () => {
    emailAddresses = [['already@email'], ['given@email']]

    const result = filterEmailAddresses(DEV_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses.flat(), ...splitDevEmailAddresses])
  })

  test('should return a flat string array when a staggered pre-populated emailAddresses array and an event matching the criteria of debt enrichment are given', async () => {
    emailAddresses = [['already@email'], 'given@email']

    const result = filterEmailAddresses(DEBT_ENRICHMENT_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses.flat(), ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return a flat string array when a nested pre-populated emailAddresses array and an event matching the criteria for debt enrichment are given', async () => {
    emailAddresses = [['already@email'], ['given@email']]

    const result = filterEmailAddresses(DEBT_ENRICHMENT_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses.flat(), ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return a flat string array when a staggered pre-populated emailAddresses array and an event matching the criteria of dev and debt enrichment are given', async () => {
    emailAddresses = [['already@email'], 'given@email']

    const result = filterEmailAddresses(DEV_AND_DEBT_ENRICHMENT_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses.flat(), ...splitDevEmailAddresses, ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return a flat string array when a nested pre-populated emailAddresses array and an event matching the criteria  of dev and debt enrichment are given', async () => {
    emailAddresses = [['already@email'], ['given@email']]

    const result = filterEmailAddresses(DEV_AND_DEBT_ENRICHMENT_EVENT, emailAddresses)

    expect(result).toStrictEqual([...emailAddresses.flat(), ...splitDevEmailAddresses, ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return a flat array of coreSolutionsEmailAddresses when an event with name of "batch-processing-payment-request-invalid" is given', async () => {
    event = { ...CORE_SOLUTIONS_EVENT, name: 'batch-processing-payment-request-invalid' }
    const result = filterEmailAddresses(event)
    expect(result).toStrictEqual(splitCoreSolutionsEmailAddresses)
  })

  test('should return a flat array of devEmailAddresses when an event with name of "responses-processing-quarantine-error" is given', async () => {
    event = { ...DEV_EVENT, name: 'responses-processing-quarantine-error' }
    const result = filterEmailAddresses(event)
    expect(result).toStrictEqual(splitDevEmailAddresses)
  })

  test('should return a flat array of devEmailAddresses and debtEnrichmentEmailAddresses when an event with name of "payment-request-blocked" is given', async () => {
    event = { ...DEV_EVENT, name: 'payment-request-blocked' }
    const result = filterEmailAddresses(event)
    expect(result).toStrictEqual([...splitDevEmailAddresses, ...splitDebtEnrichmentEmailAddresses])
  })

  test('should return a flat array of coreSolutionsEmailAddresses when an event with name of "batch-processing-error" is given', async () => {
    event = { ...DEV_EVENT, name: 'batch-processing-error' }
    const result = filterEmailAddresses(event)
    expect(result).toStrictEqual(splitCoreSolutionsEmailAddresses)
  })

  test('should return a flat array of devEmailAddresses when an event with name of "batch-processing-quarantine-error" is given', async () => {
    event = { ...DEV_EVENT, name: 'batch-processing-quarantine-error' }
    const result = filterEmailAddresses(event)
    expect(result).toStrictEqual(splitDevEmailAddresses)
  })
})
