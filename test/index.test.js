const mockContext = require('./mock-context')
const mockMessage = require('./mock-context')

let alert
let validateMessage
let sendEmails

describe('alert', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    jest.mock('../ffc-pay-alerts/validate-message')
    validateMessage = require('../ffc-pay-alerts/validate-message')

    jest.mock('../ffc-pay-alerts/notify')
    sendEmails = require('../ffc-pay-alerts/notify').sendEmails

    alert = require('../ffc-pay-alerts')
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

  test('should call sendEmails when a valid message is received', async () => {
    await alert(mockContext, mockMessage)

    expect(sendEmails).toHaveBeenCalled()
  })

  test('should call sendEmails with correct parameters when a valid message is received', async () => {
    await alert(mockContext, mockMessage)

    expect(sendEmails).toHaveBeenCalledWith(mockContext, mockMessage)
  })

  test('should not call sendEmails when validateMessage throws Error', async () => {
    validateMessage.mockImplementation(() => { throw new Error() })

    try {
      await alert(mockContext, mockMessage)
    } catch (err) {
      expect(validateMessage).toHaveBeenCalled()
      expect(validateMessage).toThrowError(Error)
      expect(sendEmails).not.toHaveBeenCalled()
    }
  })
})
