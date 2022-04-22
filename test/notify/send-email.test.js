const flatten = require('flat')
const env = require('../env')
const mockContext = require('../mock-context')
const mockMessage = require('../mock-context')
const mockReference = require('../mock-reference')

let NotifyClient
let validateEmail
let sendEmail
let emailAddress
let defaultReference

describe('send email', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    jest.mock('../ffc-pay-alerts/notify/validate-message')
    validateEmail = require('../ffc-pay-alerts/notify/validate-email')

    NotifyClient = require('notifications-node-client').NotifyClient
    jest.mock('notifications-node-client')

    sendEmail = require('../../ffc-pay-alerts/notify/send-email')

    emailAddress = 'test@test.com'

    defaultReference = ''
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should correctly configure Notify client on module import', async () => {
    expect(NotifyClient).toHaveBeenCalledTimes(1)
    expect(NotifyClient).toHaveBeenCalledWith(env.notifyApiKey)
  })

  test('should call validateEmail when a valid message is received', async () => {
    await sendEmail(mockContext, mockMessage)

    expect(validateEmail).toHaveBeenCalled()
  })

  test('should call validateEmail with default emailAddress when sendEmail is called without a given emailAddress', async () => {
    await sendEmail(mockContext, mockMessage)

    expect(validateEmail).toHaveBeenCalledWith(env.notifyEmailAddress)
  })

  test('should not reject when validateEmail with default emailAddress when sendEmail is called without a given emailAddress', async () => {
    await sendEmail(mockContext, mockMessage)

    expect(validateEmail).resolves()
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
      reference: defaultReference
    })
  })

  test('should call notifyClient.sendEmail with correct parameters when a emailAddress and reference are received', async () => {
    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = NotifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(env.notifyEmailTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('should throw error when sendEmail rejects', async () => {
    NotifyClient.prototype.sendEmail.mockRejectedValue({ Error: 'Request failed with status code 403' })

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when sendEmail rejects', async () => {
    NotifyClient.prototype.sendEmail.mockRejectedValue({ Error: 'Request failed with status code 403' })

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw "Oh dear" Error when sendEmail rejects', async () => {
    NotifyClient.prototype.sendEmail.mockRejectedValue({ Error: 'Request failed with status code 403' })

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(/^Oh dear/)
  })
})
