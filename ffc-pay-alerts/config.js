module.exports = {
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyEmailTemplateId: process.env.NOTIFY_EMAIL_TEMPLATE_ID,
  notifyEmailAddress: process.env.NOTIFY_EMAIL_ADDRESS,
  notifyEmailAddresses: process.env.NOTIFY_EMAIL_ADDRESSES,
  devEmailAddresses: process.env.DEV_EMAIL_ADDRESSES,
  debtEnrichmentEmailAddresses: process.env.DEBT_ENRICHMENT_EMAIL_ADDRESSES,
  coreSolutionsEmailAddresses: process.env.CORE_SOLUTIONS_EMAIL_ADDRESSES,
  invalidBankDetailsEmailAddresses: process.env.INVALID_BANK_DETAILS_EMAIL_ADDRESSES,
  environment: process.env.FFC_ENVIRONMENT ?? 'local'
}
