const formatEmailAddresses = require('../../../ffc-pay-alerts/notify/format-email-addresses')
let emailAddresses
const emailOne = 'test@test.com'
const emailTwo = 'not-real@test.com'
const emailThree = 'another-test@test.com'
const emailArray = [emailOne, emailTwo, emailThree]

describe('format email addresses', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  test('should return an array', async () => {
    emailAddresses = `${emailOne},${emailTwo}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toBeInstanceOf(Array)
  })

  test('should return an array equal to emailArray when emailAddresses has no spaces', async () => {
    emailAddresses = `${emailOne},${emailTwo},${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has single spaces between emails', async () => {
    emailAddresses = `${emailOne}, ${emailTwo}, ${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has single space after first email', async () => {
    emailAddresses = `${emailOne}, ${emailTwo},${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has single space after second email', async () => {
    emailAddresses = `${emailOne},${emailTwo}, ${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has double spaces', async () => {
    emailAddresses = `${emailOne},  ${emailTwo},  ${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has double spaces after first email', async () => {
    emailAddresses = `${emailOne},  ${emailTwo},${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has double spaces after second email', async () => {
    emailAddresses = `${emailOne},${emailTwo},  ${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has triple spaces after first email', async () => {
    emailAddresses = `${emailOne},   ${emailTwo},${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has triple spaces after second email', async () => {
    emailAddresses = `${emailOne},${emailTwo},   ${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has spaces at start of string', async () => {
    emailAddresses = ` ${emailOne},${emailTwo},${emailThree}`
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has spaces at end of string', async () => {
    emailAddresses = ` ${emailOne},${emailTwo},${emailThree} `
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })

  test('should return an array equal to emailArray when emailAddresses has spaces interspersed', async () => {
    emailAddresses = ` ${emailOne}, ${emailTwo},   ${emailThree}  `
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toStrictEqual(emailArray)
  })
})
