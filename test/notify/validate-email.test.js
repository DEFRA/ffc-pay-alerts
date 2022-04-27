const validateEmail = require('../../ffc-pay-alerts/notify/validate-email')
const mockContext = require('../mock-context')

let emailAddress

describe('validate email', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()

    emailAddress = 'test@test.com'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should not throw an error when emailAddress is valid', async () => {
    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).not.toThrow()
  })

  test('should throw an error when emailAddress is empty', async () => {
    emailAddress = ''

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when emailAddress is empty', async () => {
    emailAddress = ''

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw an error which ends with "not allowed to be empty" when emailAddress is empty', async () => {
    emailAddress = ''

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrowError(/not allowed to be empty$/)
  })

  test('should throw an error when emailAddress is not a string', async () => {
    emailAddress = ['test', '@', 'test', '.com']

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when emailAddress is not a string', async () => {
    emailAddress = ['test', '@', 'test', '.com']

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw an error which ends with "must be a string" when emailAddress is not a string', async () => {
    emailAddress = ['test', '@', 'test', '.com']

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrowError(/must be a string$/)
  })

  test('should throw an error when emailAddress has an unregistered IANA top level domain (TLD)', async () => {
    emailAddress = 'valid@domain.notarealtld'

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when emailAddress has an unregistered IANA top level domain (TLD)', async () => {
    emailAddress = 'valid@domain.notarealtld'

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw an error which ends with "must be a valid email" when emailAddress has an unregistered IANA top level domain (TLD)', async () => {
    emailAddress = 'valid@domain.notarealtld'

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrowError(/must be a valid email$/)
  })

  test('should throw an error when emailAddress has 2 @ signs', async () => {
    emailAddress = '@test@test.com'

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow()
  })

  test('should throw Error when emailAddress has 2 @ signs', async () => {
    emailAddress = '@test@test.com'

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw an error which ends with "must be a valid email" when emailAddress has 2 @ signs', async () => {
    emailAddress = '@test@test.com'

    const wrapper = async () => {
      await validateEmail(mockContext, emailAddress)
    }

    expect(wrapper).rejects.toThrowError(/must be a valid email$/)
  })
})
