const User = require('../models/User')
const removeHashPassword = require('../utils/removeHashPassword')

const findAll = async (rolID) => {
  if (rolID !== 1) {
    return null
  }
  const allUsers = await User.findAll()
  // Para seguridad no devolver password_hash
  const filteredUsers = removeHashPassword({ arr: allUsers })
  return filteredUsers
}

const findOne = async (username) => {
  const user = await User.findByUsername(username)
  if (!user) {
    return null
  }
  const filteredUser = removeHashPassword({ user })
  return filteredUser
}

module.exports = {
  findAll,
  findOne
}
