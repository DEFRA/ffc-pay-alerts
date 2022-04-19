const validateMessage = require('../ffc-pay-alerts/validate-message')
const mockContext = require('./mock-context')

let mockMessage

describe('validate message', () => {
  beforeEach(() => {
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

  test('should not throw Error when a valid message value is received', async () => {
    const wrapper = async () => {
      await validateMessage(mockContext, mockMessage)
    }

    expect(wrapper).not.toThrowError(Error)
  })

  test('should throw Error when an invalid message value is received', async () => {
    mockMessage = {
      ...mockMessage,
      name: ['valid property', 'but invalid property value']
    }

    const wrapper = async () => {
      await validateMessage(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(Error)
  })

  test('should throw an error which starts with "The message schema is invalid" when an invalid message value is received', async () => {
    mockMessage = {
      ...mockMessage,
      name: ['valid property', 'but invalid property value']
    }

    const wrapper = async () => {
      await validateMessage(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(/^The message schema is invalid/)
  })

  test('should throw Error when an invalid message property is received', async () => {
    mockMessage = {
      ...mockMessage,
      invalidProperty: 'not a valid message property'
    }

    const wrapper = async () => {
      await validateMessage(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(Error)
  })

  test('should throw an error which starts with "The message schema is invalid" when an invalid message property is received', async () => {
    mockMessage = {
      ...mockMessage,
      invalidProperty: 'not a valid message property'
    }

    const wrapper = async () => {
      await validateMessage(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(/^The message schema is invalid/)
  })

  test('should throw Error when an empty string message value is received for a required field', async () => {
    mockMessage = {
      ...mockMessage,
      name: ''
    }

    const wrapper = async () => {
      try {
        await validateMessage(mockContext, mockMessage)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    expect(wrapper).rejects.toThrowError(Error)
  })

  test('should throw an error which starts with "The message schema is invalid" when an empty string message value is received for a required field', async () => {
    mockMessage = {
      ...mockMessage,
      name: ''
    }

    const wrapper = async () => {
      try {
        await validateMessage(mockContext, mockMessage)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    expect(wrapper).rejects.toThrowError(/^The message schema is invalid/)
  })

  test('should throw Error when an undefined message value is received for a required field', async () => {
    mockMessage = {
      ...mockMessage,
      name: undefined
    }

    const wrapper = async () => {
      try {
        await validateMessage(mockContext, mockMessage)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    expect(wrapper).rejects.toThrowError(Error)
  })

  test('should throw an error which starts with "The message schema is invalid" when an empty message is received', async () => {
    mockMessage = {}

    const wrapper = async () => {
      try {
        await validateMessage(mockContext, mockMessage)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    expect(wrapper).rejects.toThrowError(/^The message schema is invalid/)
  })
})
