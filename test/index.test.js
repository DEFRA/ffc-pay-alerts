const sender = require('../ffc-pay-alert')
const mockContext = require('./mock-context')

const mockMessage = {
  Test: 123
}

describe('alert', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should log out message', async () => {
    await sender(mockContext, mockMessage)
    expect(mockContext.log).toHaveBeenCalled()
  })
})
