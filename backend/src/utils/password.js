const bcrypt = require('bcrypt')

const hashPassword = async ({ clearPassword }) => {
  try {
    const salt = await bcrypt.genSalt(8)
    const hash = await bcrypt.hash(clearPassword, salt)
    return hash
  } catch (error) {
    throw new Error(error)
  }
}

const comparePassword = async ({ clearPassword, hash }) => {
  if (!hash) return false
  const result = await bcrypt.compare(clearPassword, hash)
  return result
}

module.exports = {
  hashPassword,
  comparePassword
}
