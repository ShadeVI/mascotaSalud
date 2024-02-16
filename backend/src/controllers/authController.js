const { generateJWT } = require('../utils/JWT')

const authService = require('../services/authService')

const signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return next({
        error: 'BAD REQUEST',
        message: 'Datos insuficientes',
        code: 401
      })
    }
    // SERVICE SIGN UP
    const user = await authService.signup({ email, password, username })

    if (!user) {
      return next({
        error: 'BAD REQUEST',
        message: 'Datos invalidos',
        code: 401
      })
    }

    const dataToToken = {
      UUID: user.UUID,
      email: user.email,
      username: user.username,
      rolID: user.ID_rol
    }
    const jwtToken = await generateJWT(dataToToken)
    return res.status(201).cookie('jwt', jwtToken, { httpOnly: true }).json({ message: 'Registrado' })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return next({
        error: 'BAD REQUEST',
        message: 'Datos insuficientes',
        code: 401
      })
    }

    const user = await authService.login({ email, password })

    if (!user) {
      return next({
        error: 'BAD REQUEST',
        message: 'Datos invalidos',
        code: 401
      })
    }

    const dataToToken = {
      UUID: user.UUID,
      email: user.email,
      username: user.username,
      rolID: user.ID_rol
    }
    const jwtToken = await generateJWT(dataToToken)
    return res.status(200).cookie('jwt', jwtToken, { httpOnly: true }).json({ message: 'Inicio de sesion correcto' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login
}
