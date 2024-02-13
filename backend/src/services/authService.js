const User = require('../models/User')
const Role = require('../models/Role')
const { hashPassword, comparePassword } = require('../utils/password')

const signup = async ({ email, username, password }) => {
  const allUsers = await User.findAll()

  // Verificamos si no hay usuarios. Si es el primer registro, este usuario tendrá rol de Admin (1).
  let rol = 2 // usuario cliente

  if (allUsers.length === 0) {
    rol = 1 // usuario admin
  }

  // Verificamos si el usuario ya existe
  const users = allUsers.filter(user => user.email === email)
  if (users.length > 0) {
    return false
  }

  // Hash password antes de insertar
  const hashPass = await hashPassword({ clearPassword: password })

  // Se guardó en la BD ==> true
  const isSaved = await User.save({ username, email, hashPass, rol })

  if (isSaved) {
    const userData = User.findByUsername(username)
    return userData
  }

  return null
}

const login = async ({ email, password }) => {
  const user = await User.findByEmail(email)

  if (!user) {
    return null
  }
  const { password_hash: passHash } = user
  const isPasswordCorrect = await comparePassword({ clearPassword: password, hash: passHash })
  if (!isPasswordCorrect) {
    return null
  }
  return user
}

const isAdmin = async (user) => {
  return await Role.isAdmin(user.UUID)
}

module.exports = {
  signup,
  login,
  isAdmin
}
