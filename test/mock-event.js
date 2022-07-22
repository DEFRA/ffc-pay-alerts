const RPA_EVENT = {
  name: 'rpa-mock-event',
  properties: {
    id: '323d9875-1732-4a44-b24e-46e8b6355559',
    checkpoint: 'ffc-pay-request-editor-local',
    status: 'success',
    action: {
      type: 'blocked',
      message: 'This event is only here until an event which only RPA will receive. The rpa-events-config has as a selection the name of this event',
      data: {},
      timestamp: '2022-05-20T15:58:30.168Z'
    }
  }
}

const DEV_EVENT = {
  name: 'dev-mock-event',
  properties: {
    id: '2823b94b-ee45-496c-aea1-e6ff8962beff',
    checkpoint: 'ffc-pay-batch-processor-local',
    status: 'error',
    action: {
      type: 'error',
      message: 'Invalid file',
      data: {
        filename: 'SITIELM0004_INVALID_FILE_20220307172712493.dat'
      },
      timestamp: '2022-05-20T15:59:19.158Z'
    }
  }
}

const DEV_AND_RPA_EVENT = {
  name: 'mock-event-name',
  properties: {
    id: '2823b94b-ee45-496c-aea1-e6ff8962beff',
    checkpoint: 'ffc-pay-batch-processor-local',
    status: 'error',
    action: {
      type: 'error',
      message: 'Invalid file',
      data: {
        filename: 'SITIELM0004_INVALID_FILE_20220307172712493.dat'
      },
      timestamp: '2022-05-20T15:59:19.158Z'
    }
  }
}

module.exports = {
  RPA_EVENT,
  DEV_EVENT,
  DEV_AND_RPA_EVENT
}
