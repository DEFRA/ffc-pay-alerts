const env = require('../env')
const mockContext = require('../mock-context')

let sendEmail
let sendEmails
let mockMessage
let emailAddresses
let mockReference
let mockDefaultReference

describe('send emails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    jest.mock('../../ffc-pay-alerts/notify/send-email')
    sendEmail = require('../../ffc-pay-alerts/notify/send-email')

    sendEmails = require('../../ffc-pay-alerts/notify/send-emails')

    mockMessage = {
      name: 'test',
      properties: {
        id: '123456789',
        checkpoint: 'test',
        status: 'testing',
        action: {
          type: 'test',
          message: 'test',
          timestamp: new Date(),
          data: {}
        }
      }
    }

    emailAddresses = ['test@test.com', 'not-real@test.com']

    mockReference = 'fa5aff10-24e7-4b57-986e-00fb624dc5d4'
    mockDefaultReference = ''
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

    expect(sendEmail.mock.calls[0]).toEqual([mockContext, mockMessage, env.notifyEmailAddresses[0], mockDefaultReference])
    expect(sendEmail.mock.calls[1]).toEqual([mockContext, mockMessage, env.notifyEmailAddresses[1], mockDefaultReference])
  })

  test('should throw error when sendEmail rejects', async () => {
    sendEmail.mockRejectedValue(new Error('Oh dear'))

    const wrapper = async () => {
      await sendEmails(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when sendEmail rejects', async () => {
    sendEmail.mockRejectedValue(new Error('Oh dear'))

    const wrapper = async () => {
      await sendEmails(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw "Oh dear" Error when sendEmail rejects', async () => {
    sendEmail.mockRejectedValue(new Error('Oh dear'))

    const wrapper = async () => {
      await sendEmails(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(/^Oh dear/)
  })
})
