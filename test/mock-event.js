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

// const BLOCKED_EVENT = {
//   name: 'payment-request-blocked',
//   properties: {
//     id: 'd8899356-6485-48f5-a282-8822f451f77c',
//     checkpoint: 'ffc-pay-request-editor-local',
//     status: 'success',
//     action: {
//       type: 'blocked',
//       message: 'Payment request does not have debt data to attach.',
//       data: {
//         paymentRequest: {
//           schemeId: 2,
//           sourceSystem: 'SFIP',
//           deliveryBody: 'RP00',
//           invoiceNumber: 'S0000011SFIP000011V002',
//           frn: '1000000001',
//           sbi: null,
//           ledger: 'AP',
//           marketingYear: 2022,
//           agreementNumber: 'SIP000000000001',
//           contractNumber: 'SFIP000011',
//           paymentRequestNumber: 2,
//           currency: 'GBP',
//           schedule: 'Q4',
//           dueDate: '01/12/2022',
//           debtType: null,
//           recoveryDate: null,
//           originalSettlementDate: null,
//           value: 40000,
//           received: '2022-05-20T15:58:28.066Z',
//           referenceId: '515642bb-61a1-456b-bfeb-10989804930f',
//           correlationId: 'd8899356-6485-48f5-a282-8822f451f77c',
//           invoiceLines: [
//             {
//               paymentRequestId: 11,
//               schemeCode: '80001',
//               accountCode: 'SOS273',
//               fundCode: 'DRD10',
//               description: 'G00 - Gross value of claim',
//               value: 40000
//             }
//           ],
//           scheme: {
//             schemeId: 2,
//             name: 'SFI Pilot',
//             active: true
//           },
//           categoryId: 1,
//           paymentRequestId: 1
//         }
//       },
//       timestamp: '2022-05-20T15:58:30.168Z'
//     }
//   }
// }

// const ERROR_EVENT = {
//   name: 'batch-processing-error',
//   properties: {
//     id: '2823b94b-ee45-496c-aea1-e6ff8962beff',
//     checkpoint: 'ffc-pay-batch-processor-local',
//     status: 'error',
//     action: {
//       type: 'error',
//       message: 'Invalid file',
//       data: {
//         filename: 'SITIELM0004_INVALID_FILE_20220307172712493.dat'
//       },
//       timestamp: '2022-05-20T15:59:19.158Z'
//     }
//   }
// }

module.exports = {
  RPA_EVENT,
  DEV_EVENT,
  DEV_AND_RPA_EVENT
}
