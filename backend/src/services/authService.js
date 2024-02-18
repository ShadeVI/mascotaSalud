const User = require('../models/User')
const { hashPassword, comparePassword } = require('../utils/password')
const removeHashPassword = require('../utils/removeHashPassword')

const signup = async ({ email, username, password }) => {
  const allUsers = await User.findAll()

  // Verificamos si el usuario ya existe
  const users = allUsers.filter(user => user.email === email)

  if (users.length > 0) {
    throw new Error('Usuario ya existe')
  }

  // Hash password antes de insertar
  const hashPass = await hashPassword({ clearPassword: password })

  // Se guardó en la BD ==> true
  const isSaved = await User.save({ username, email, hashPass })

  if (isSaved) {
    let userData = User.findByUsername(username)
    userData = removeHashPassword({ user: userData })
    return userData
  }

  return null
}

const login = async ({ email, password }) => {
  let user = await User.findByEmail(email)

  if (!user) {
    return null
  }
  const { password_hash: passHash } = user
  const isPasswordCorrect = await comparePassword({ clearPassword: password, hash: passHash })
  if (!isPasswordCorrect) {
    return null
  }
  user = removeHashPassword({ user })
  return user
}

module.exports = {
  signup,
  login
}
