const env = require('../../env')
const mockContext = require('../../mock-context')
const mockMessage = require('../../mock-message')
const mockReference = require('../../mock-reference')

let sendEmail
let sendEmails
let emailAddresses
let defaultEmailAddresses

describe('send emails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    jest.mock('../../../ffc-pay-alerts/notify/send-email')
    sendEmail = require('../../../ffc-pay-alerts/notify/send-email')

    sendEmails = require('../../../ffc-pay-alerts/notify/send-emails')

    emailAddresses = ['test@test.com', 'not-real@test.com']

    defaultEmailAddresses = env.notifyEmailAddresses.split(',')

    jest.mock('uuid', () => ({ v4: () => mockReference }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call sendEmail when valid context, message, emailAddresses and reference are received', async () => {
    await sendEmails(mockContext, mockMessage, emailAddresses, mockReference)

    expect(sendEmail).toHaveBeenCalled()
  })

  test('should call sendEmail 2 times when 2 emailAddresses are received', async () => {
    await sendEmails(mockContext, mockMessage, emailAddresses, mockReference)

    expect(sendEmail).toHaveBeenCalledTimes(2)
  })

  test('should call sendEmail with context, message, reference and each emailAddress when valid context, message, emailAddresses and reference are received', async () => {
    await sendEmails(mockContext, mockMessage, emailAddresses, mockReference)

    expect(sendEmail.mock.calls[0]).toEqual([mockContext, mockMessage, emailAddresses[0], mockReference])
    expect(sendEmail.mock.calls[1]).toEqual([mockContext, mockMessage, emailAddresses[1], mockReference])
  })

  test('should call sendEmail 1 time when 1 string emailAddress is received', async () => {
    await sendEmails(mockContext, mockMessage, emailAddresses[0], mockReference)

    expect(sendEmail).toHaveBeenCalledTimes(1)
  })

  test('should call sendEmail with context, message, emailAddress and reference when 1 string emailAddress is received', async () => {
    await sendEmails(mockContext, mockMessage, emailAddresses[0], mockReference)

    expect(sendEmail).toHaveBeenCalledWith(mockContext, mockMessage, emailAddresses[0], mockReference)
  })

  test('should call sendEmail 1 time when 1 array emailAddress is received', async () => {
    await sendEmails(mockContext, mockMessage, [emailAddresses[0]], mockReference)

    expect(sendEmail).toHaveBeenCalledTimes(1)
  })

  test('should call sendEmail with context, message, emailAddress and reference when 1 array emailAddress is received', async () => {
    await sendEmails(mockContext, mockMessage, [emailAddresses[0]], mockReference)

    expect(sendEmail).toHaveBeenCalledWith(mockContext, mockMessage, emailAddresses[0], mockReference)
  })

  test('should call sendEmail with context, message and default emailAddresses and reference when valid context and message are received', async () => {
    await sendEmails(mockContext, mockMessage)

    expect(sendEmail.mock.calls[0]).toEqual([mockContext, mockMessage, defaultEmailAddresses[0], mockReference])
    expect(sendEmail.mock.calls[1]).toEqual([mockContext, mockMessage, defaultEmailAddresses[1], mockReference])
  })

  test('should handle and resolve any thrown error from sendEmail', async () => {
    sendEmail.mockRejectedValue(new Error('Oh dear'))

    expect(sendEmails(mockContext, mockMessage)).resolves.not.toThrow()
  })

  test('confirm error thrown by sendEmail is caught and logged', async () => {
    const errorMock = new Error('Oh dear')
    const logSpy = jest.spyOn(mockContext, 'log')
    sendEmail.mockRejectedValue(errorMock)
    await sendEmails(mockContext, mockMessage)

    expect(logSpy).toHaveBeenCalledWith(errorMock)
  })
})
