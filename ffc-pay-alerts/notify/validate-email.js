const schema = require('../schema/email')

const validateEmail = async (context, emailAddress) => {
  const result = schema.validate(emailAddress, { abortEarly: false })
  if (result.error) {
    const errMessage = `The email address is invalid. ${result.error.message}`
    context.log(errMessage)
    throw new Error(errMessage)
  }
}

module.exports = validateEmail
