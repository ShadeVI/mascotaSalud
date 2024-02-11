const User = require('../models/User')
const { generateJWT } = require('../utils/JWT')
const { comparePassword } = require('../utils/password')

const signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body
    const result = await User.signup({ email, password, username })
    const dataToToken = {
      UUID: result.UUID,
      email: result.email,
      username: result.username,
      rol: result.ID_rol
    }
    const jwtToken = await generateJWT(dataToToken)

    res.cookie('jwt', jwtToken, { httpOnly: true }).status(201).json({ message: 'Registrado', jwt: jwtToken })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { password_hash: passHash } = await User.findPasswordHash(email)
    const isPasswordCorrect = await comparePassword({ clearPassword: password, hash: passHash })
    if (!isPasswordCorrect) {
      return res.status(403).json({ error: 'Password incorrecta' })
    }
    const userData = await User.findByEmail(email)
    const dataToToken = {
      UUID: userData.UUID,
      email: userData.email,
      username: userData.username,
      rol: userData.ID_rol
    }
    const jwtToken = await generateJWT(dataToToken)
    return res.cookie('jwt', jwtToken, { httpOnly: true }).status(200).json({ message: 'Inicio de sesion correcto', jwt: jwtToken })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login
}
