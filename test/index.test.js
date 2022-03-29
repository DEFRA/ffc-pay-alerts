jest.mock('../ffc-pay-alert/validate-message')
const validateMessage = require('../ffc-pay-alert/validate-message')

const sender = require('../ffc-pay-alert')
const mockContext = require('./mock-context')

let mockMessage

describe('alert', () => {
  beforeEach(() => {
    validateMessage.mockReturnValue = undefined

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

  test('should call validateMessage when an invalid message is received', async () => {
    mockMessage = {
      invalidProperty: 'invalid property name'
    }

    await sender(mockContext, mockMessage)
    expect(validateMessage).toHaveBeenCalled()
  })
})
