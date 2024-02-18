const { generateJWT } = require('../utils/JWT')

const authService = require('../services/authService')
const removeHashPassword = require('../utils/removeHashPassword')

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
      username: user.username
    }
    const jwtToken = await generateJWT(dataToToken)
    return res.status(201).cookie('jwt', jwtToken, { httpOnly: true }).json({ error: null, result: { data: removeHashPassword({ user }), message: 'Registrado' } })
  } catch (error) {
    if (error.message === 'Usuario ya existe') {
      return next({
        error: 'BAD REQUEST',
        message: error.message,
        code: 401
      })
    }
    return next(error)
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
        message: 'Email/contraseña no validas',
        code: 401
      })
    }

    const dataToToken = {
      UUID: user.UUID,
      email: user.email,
      username: user.username
    }
    const jwtToken = await generateJWT(dataToToken)
    return res.status(200).cookie('jwt', jwtToken, { httpOnly: true }).json({ error: null, result: { data: removeHashPassword({ user }), message: 'Inicio de sesion correcto' } })
  } catch (error) {
    next(error)
  }
}

const checkToken = (req, res, next) => {
  if (res.locals?.user) {
    return res.redirect(`/users/${res.locals.user.username}`)
  } else {
    return res.status(400).json({ error: 'Token no valido' })
  }
}

const logout = (req, res) => {
  return res.status(200).cookie('jwt', 'jwtToken', { httpOnly: true, maxAge: -1 }).json({ error: null, result: { data: null, message: 'Logout correcto' } })
}

module.exports = {
  signup,
  login,
  checkToken,
  logout
}
