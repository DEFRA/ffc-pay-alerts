const mockContext = require('./mock-context')

let alert
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
    sendEmail = require('../ffc-pay-alerts/notify').sendEmail

    alert = require('../ffc-pay-alerts')

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
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call validateMessage when a valid message is received', async () => {
    await alert(mockContext, mockMessage)

    expect(validateMessage).toHaveBeenCalled()
  })

  test('should call validateMessage with correct parameters when a valid message is received', async () => {
    await alert(mockContext, mockMessage)

    expect(validateMessage).toHaveBeenCalledWith(mockContext, mockMessage)
  })

  test('should call sendEmail when a valid message is received', async () => {
    await alert(mockContext, mockMessage)

    expect(sendEmail).toHaveBeenCalled()
  })

  test('should call sendEmail with correct parameters when a valid message is received', async () => {
    await alert(mockContext, mockMessage)

    expect(sendEmail).toHaveBeenCalledWith(mockContext, mockMessage)
  })

  test('should not call sendEmail when validateMessage throws Error', async () => {
    validateMessage.mockImplementation(() => { throw new Error() })

    try {
      await alert(mockContext, mockMessage)
    } catch (err) {
      expect(validateMessage).toHaveBeenCalled()
      expect(validateMessage).toThrowError(Error)
      expect(sendEmail).not.toHaveBeenCalled()
    }
  })
})
