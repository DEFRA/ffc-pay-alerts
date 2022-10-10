const flatten = require('flat')
const env = require('../../env')
const mockContext = require('../../mock-context')
const mockMessage = require('../../mock-message')
const mockReference = require('../../mock-reference')
const mockEventTemplate = require('../../mock-event-template')

let notifyClient
let validateEmail
let sendEmail
let emailAddress
let defaultEmailAddress
let eventTemplateId

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

    jest.mock('uuid', () => ({ v4: () => mockReference }))

    eventTemplateId = ''
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

  test('should not call notifyClient.sendEmail with empty reference', async () => {
    await sendEmail(mockContext, mockMessage)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(env.notifyEmailTemplateId, env.notifyEmailAddress, {
      personalisation: flatten(mockMessage),
      reference: ''
    })
  })

  test('should  call notifyClient.sendEmail with uuid when no reference is provided', async () => {
    await sendEmail(mockContext, mockMessage)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(env.notifyEmailTemplateId, env.notifyEmailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
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

  test('should call notifyClient.sendEmail with correct event-notifyTemplateId when event-notifyTemplate exists in templateSchema', async () => {
    mockMessage.name = mockEventTemplate.name
    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(mockEventTemplate.notifyTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('should not call notifyClient.sendEmail with the env (general/default) notifyEmailTemplateId when event-notifyTemplate exists in templateSchema', async () => {
    mockMessage.name = mockEventTemplate.name

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(env.notifyEmailTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('should not call notifyClient.sendEmail with  event-notifyTemplateId when event-notifyTemplate does not exist in templateSchema', async () => {
    mockEventTemplate.name = 'invalid-payment-request-enrichment-error'
    mockMessage.name = mockEventTemplate.name

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(mockEventTemplate.notifyTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('should call notifyClient.sendEmail with the env (general) notifyEmailTemplateId when event-notifyTemplate does not exists in templateSchema', async () => {
    mockMessage.name = 'invalid-payment-request-enrichment-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(env.notifyEmailTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('should call notifyClient.sendEmail with the env (general) notifyEmailTemplateId when event-notifyTemplate does not exists in templateSchema', async () => {
    mockMessage.name = 'invalid-payment-request-enrichment-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(env.notifyEmailTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm batch-processing-error event-templateId is 0b1871ae-095d-4951-bf7e-1bea39a2c995', async () => {
    eventTemplateId = '0b1871ae-095d-4951-bf7e-1bea39a2c995'
    mockMessage.name = 'batch-processing-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm batch-processing-error event-templateId is not empty string', async () => {
    mockMessage.name = 'batch-processing-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-enrichment-error event-templateId is 982b92b2-da06-4c51-8996-33b13dd4ce04', async () => {
    eventTemplateId = '982b92b2-da06-4c51-8996-33b13dd4ce04'
    mockMessage.name = 'payment-request-enrichment-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-enrichment-error event-templateId is not empty string', async () => {
    mockMessage.name = 'payment-request-enrichment-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-processing-error event-templateId is 6645e4aa-aec9-48d9-a674-aa3b15e9cebb', async () => {
    eventTemplateId = '6645e4aa-aec9-48d9-a674-aa3b15e9cebb'
    mockMessage.name = 'payment-request-processing-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-processing-error event-templateId is not empty string', async () => {
    mockMessage.name = 'payment-request-processing-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-blocked event-templateId is 3756efe8-d1a4-44aa-ba73-46666ce4dffe', async () => {
    eventTemplateId = '3756efe8-d1a4-44aa-ba73-46666ce4dffe'
    mockMessage.name = 'payment-request-blocked'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-blocked event-templateId is not empty string', async () => {
    mockMessage.name = 'payment-request-blocked'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-submission-error event-templateId is fb29affd-9493-467d-bdcf-7fb96463c15b ', async () => {
    eventTemplateId = 'fb29affd-9493-467d-bdcf-7fb96463c15b'
    mockMessage.name = 'payment-request-submission-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })

  test('confirm payment-request-submission-error event-templateId is not empty string', async () => {
    mockMessage.name = 'payment-request-submission-error'

    await sendEmail(mockContext, mockMessage, emailAddress, mockReference)

    const notifyClientMockInstance = notifyClient.mock.instances[0]
    expect(notifyClientMockInstance.sendEmail).not.toHaveBeenCalledWith(eventTemplateId, emailAddress, {
      personalisation: flatten(mockMessage),
      reference: mockReference
    })
  })
})
