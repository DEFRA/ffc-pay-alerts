module.exports = {
  name: 'Enrichment needed for payment request',
  properties: {
    id: '1234567890',
    checkpoint: 'acr-test-log-web',
    status: 'in progress',
    action: {
      type: 'error',
      message: 'Enrichment needed',
      timestamp: '2022-02-22T15:00:00.000Z',
      data: {}
    }
  }
}
