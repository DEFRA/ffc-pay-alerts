const flatten = require('flat')
const env = require('../env')
const mockContext = require('../mock-context')

let NotifyClient
let sendEmail
let mockMessage
let mockReference

describe('send email', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    NotifyClient = require('notifications-node-client').NotifyClient
    jest.mock('notifications-node-client')

    sendEmail = require('../../ffc-pay-alerts/notify').sendEmail

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
    mockReference = ''
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should correctly configure Notify client on module import', async () => {
    expect(NotifyClient).toHaveBeenCalledTimes(1)
    expect(NotifyClient).toHaveBeenCalledWith(env.notifyApiKey)
  })

  test('should call notifyClient.sendEmail when a valid message is received', async () => {
    await sendEmail(mockContext, mockMessage)

    const notifyClientMockInstance = NotifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledTimes(1)
  })

  test('should call notifyClient.sendEmail with correct parameters when a valid message is received', async () => {
    await sendEmail(mockContext, mockMessage)

    const notifyClientMockInstance = NotifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(env.notifyEmailTemplateId, env.notifyEmailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('should throw Error when the notifyClient.sendEmail promise rejects', async () => {
    NotifyClient.prototype.sendEmail.mockRejectedValue({ Error: 'Request failed with status code 403' })

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(/^Oh dear/)
  })
})
