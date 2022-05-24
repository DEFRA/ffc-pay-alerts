const flatten = require('flat')
const env = require('../../env')
const mockContext = require('../../mock-context')
const mockMessage = require('../../mock-context')
const mockReference = require('../../mock-reference')

let notifyClient
let validateEmail
let sendEmail
let emailAddress
let defaultEmailAddress
let defaultReference

describe('send email', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    jest.mock('../../../ffc-pay-alerts/notify/validate-email')
    validateEmail = require('../../../ffc-pay-alerts/notify/validate-email')

    notifyClient = require('notifications-node-client').NotifyClient
    jest.mock('notifications-node-client')

    sendEmail = require('../../../ffc-pay-alerts/notify/send-email')

    emailAddress = 'test@test.com'

    defaultEmailAddress = env.notifyEmailAddress
    defaultReference = ''
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should correctly configure Notify client on module import', async () => {
    expect(notifyClient).toHaveBeenCalledTimes(1)
    expect(notifyClient).toHaveBeenCalledWith(env.notifyApiKey)
  })

  test('should call validateEmail when a valid message is received', async () => {
    await sendEmail(mockContext, mockMessage)

    expect(validateEmail).toHaveBeenCalled()
  })

  test('should call validateEmail with default emailAddress when sendEmail is called without a given emailAddress', async () => {
    await sendEmail(mockContext, mockMessage)

    expect(validateEmail).toHaveBeenCalledWith(mockContext, defaultEmailAddress)
  })

  test('should not reject on validateEmail with default emailAddress when sendEmail is called without a given emailAddress', async () => {
    await sendEmail(mockContext, mockMessage)

    expect(validateEmail).not.toThrow()
  })

  test('should not reject with default emailAddress when sendEmail is called without a given emailAddress', async () => {
    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).not.toThrow()
  })

  test('should throw an error when validateEmail rejects', async () => {
    validateEmail.mockRejectedValue(new Error('must be a string'))

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when validateEmail rejects', async () => {
    validateEmail.mockRejectedValue(new Error('must be a string'))

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw error which starts with "Oh dear" when validateEmail rejects', async () => {
    validateEmail.mockRejectedValue(new Error('must be a string'))

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(/^Oh dear/)
  })

  test('should call notifyClient.sendEmail when a valid message is received', async () => {
    await sendEmail(mockContext, mockMessage)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledTimes(1)
  })

  test('should call notifyClient.sendEmail with correct parameters when a valid message is received', async () => {
    await sendEmail(mockContext, mockMessage)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(env.notifyEmailTemplateId, env.notifyEmailAddress, {
      personalisation: flatten(mockMessage),
      reference: defaultReference
    })
  })

  test('should call notifyClient.sendEmail with correct parameters when a emailAddress and reference are received', async () => {
    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(env.notifyEmailTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('should throw error when sendEmail rejects', async () => {
    notifyClient.prototype.sendEmail.mockRejectedValue({ Error: 'Request failed with status code 403' })

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when sendEmail rejects', async () => {
    notifyClient.prototype.sendEmail.mockRejectedValue({ Error: 'Request failed with status code 403' })

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw an error which starts with "Oh dear" when sendEmail rejects', async () => {
    notifyClient.prototype.sendEmail.mockRejectedValue({ Error: 'Request failed with status code 403' })

    const wrapper = async () => {
      await sendEmail(mockContext, mockMessage)
    }

    expect(wrapper).rejects.toThrowError(/^Oh dear/)
  })
})