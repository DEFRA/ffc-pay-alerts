const formatEmailAddresses = require('../../../ffc-pay-alerts/notify/format-email-addresses')
const emailOne = 'test@test.com'
const emailTwo = ' not-real@test.com'
const emailThree = ' another-test@test.com '
const emailAddresses = [emailOne, emailTwo, emailThree]

describe('format email addresses', () => {
  test('should return an array when emailAddresses is an array', async () => {
    const result = formatEmailAddresses(emailAddresses)
    expect(result).toBeInstanceOf(Array)
  })

  test('should return an array of containing the email addresses with no spaces when given an array with a single email with spaces in it', async () => {
    const result = formatEmailAddresses(emailThree)
    result.forEach(email => expect(email).not.toContain(' '))
  })

  test('should return an array of email addresses with no spaces in any element when given an array of multiple emails with spaces in them', async () => {
    const result = formatEmailAddresses(emailAddresses)
    result.forEach(email => expect(email).not.toContain(' '))
  })

  test('should return an array when emailAddresses is a string of one email address', async () => {
    const result = formatEmailAddresses(emailOne)
    expect(result).toBeInstanceOf(Array)
  })

  test('should return an array when emailAddresses is a string with multiple addresses', async () => {
    const result = formatEmailAddresses(`${emailOne}, ${emailTwo}, ${emailThree}`)
    expect(result).toBeInstanceOf(Array)
  })

  test('should return an array of email addresses with no spaces in any element when given a string of emails with spaces in them', async () => {
    const result = formatEmailAddresses(`${emailOne}, ${emailTwo}, ${emailThree}`)
    result.forEach(email => expect(email).not.toContain(' '))
  })
})
