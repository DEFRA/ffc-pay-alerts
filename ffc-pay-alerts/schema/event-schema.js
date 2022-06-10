module.exports = [{
  eventType: 'siti-inbound',
  service: 'siti inbound',
  notifyTemplateId: '48963d01-eb09-439c-a12e-e99129127b06',
  externalProcess: true,
  eventLinks: [
    {
      link: 'batch-processing'
    }
  ]
},
{
  eventType: 'dax-inbound',
  service: 'dax inbound',
  notifyTemplateId: '0b1871ae-095d-4951-bf7e-1bea39a2c995',
  externalProcess: true,
  eventLinks: [
    {
      link: 'payment-request-return'
    }
  ]
},
{
  eventType: 'dax-outbound',
  notifyTemplateId: 'a95cf04d-b807-425e-bcbd-2e76397a4041',
  externalProcess: true,
  service: 'dax outbound',
  eventLinks: []
},
{
  eventType: 'batch-processing',
  notifyTemplateId: '6645e4aa-aec9-48d9-a674-aa3b15e9cebb',
  service: 'ffc-pay-batch-processor',
  eventLinks: [
    {
      link: 'payment-request-enrichment'
    }
  ]
},
{
  eventType: 'payment-request-enrichment',
  service: 'ffc-pay-enrichment',
  notifyTemplateId: '3756efe8-d1a4-44aa-ba73-46666ce4dffe',
  eventLinks: [
    {
      link: 'payment-request-processing'
    }
  ]
},
{
  eventType: 'payment-request-processing',
  notifyTemplateId: 'fb29affd-9493-467d-bdcf-7fb96463c15b',
  service: 'ffc-pay-processing',
  eventLinks: [
    {
      link: 'payment-request-submission'
    },
    {
      link: 'payment-request-debt-response'
    },
    {
      link: 'payment-request-manual-ledger-response'
    }
  ]
},
{
  eventType: 'payment-request-submission',
  service: 'ffc-pay-submission',
  notifyTemplateId: '982b92b2-da06-4c51-8996-33b13dd4ce04',
  eventLinks: [
    {
      link: 'dax-outbound'
    }
  ]
},
{
  eventType: 'payment-request-debt-response',
  service: 'debt-enrichment',
  notifyTemplateId: 'e368d62c-105b-49fb-8b57-b23b5ce60e2c',
  eventLinks: [
    {
      link: 'request-editor'
    }
  ]
},
{
  eventType: 'payment-request-manual-ledger-response',
  service: 'manual-ledger-check',
  notifyTemplateId: 'b26da268-386a-4a89-b156-03afbe339de6',
  eventLinks: [
    {
      link: 'request-editor'
    }
  ]
},
{
  eventType: 'request-editor',
  service: 'ffc-pay-request-editor',
  notifyTemplateId: '305d0be0-6e8b-47d0-a909-ce58c6693442',
  eventLinks: [
    {
      link: 'payment-request-ledger-assignment-quality-checked'
    }
  ]
},
{
  eventType: 'payment-request-ledger-assignment-quality-checked',
  service: 'quality-check',
  notifyTemplateId: '1ccac70c-6367-4864-b5df-420231535ee1',
  eventLinks: [
    {
      link: 'payment-request-processing'
    }
  ]
},
{
  eventType: 'payment-request-return',
  service: 'ffc-pay-responses',
  notifyTemplateId: '46caee3f-64de-4c54-b47b-ee42f92800e4',
  eventLinks: [
    {
      link: 'payment-request-processing'
    }
  ]
}]
