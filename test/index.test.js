const mockContext = require('./mock-context')

let sender
let validateMessage
let sendEmail
let mockMessage

describe('alert', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    jest.mock('../ffc-pay-alerts/validate-message')
    validateMessage = require('../ffc-pay-alerts/validate-message')

    jest.mock('../ffc-pay-alerts/notify')
    sendEmail = require('../ffc-pay-alerts/notify')

    sender = require('../ffc-pay-alerts')

    mockMessage = {
      test: 'valid message'
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call validateMessage when a valid message is received', async () => {
    await sender(mockContext, mockMessage)

    expect(validateMessage).toHaveBeenCalled()
  })

  test('should call validateMessage with correct parameters when a valid message is received', async () => {
    await sender(mockContext, mockMessage)

    expect(validateMessage).toHaveBeenCalledWith(mockContext, mockMessage)
  })

  test('should call sendEmail when a valid message is received', async () => {
    await sender(mockContext, mockMessage)

    expect(sendEmail).toHaveBeenCalled()
  })

  test('should call sendEmail with correct parameters when a valid message is received', async () => {
    await sender(mockContext, mockMessage)

    expect(sendEmail).toHaveBeenCalledWith(mockContext, mockMessage)
  })

  test('should not call sendEmail when validateMessage throws Error', async () => {
    validateMessage.mockImplementation(() => { throw new Error() })

    try {
      await sender(mockContext, mockMessage)
    } catch (err) {
      expect(validateMessage).toHaveBeenCalled()
      expect(validateMessage).toThrowError(Error)
      expect(sendEmail).not.toHaveBeenCalled()
    }
  })
})
