const { generateJWT } = require('../utils/JWT')

const authService = require('../services/authService')

const signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return next({
        error: 'BAD REQUEST',
        message: 'Datos insuficientes',
        httpCode: 400
      })
    }
    // SERVICE SIGN UP
    const user = await authService.signup({ email, password, username })

    if (!user) {
      return next({
        error: 'BD ERROR',
        message: 'No se han podido guardar los datos',
        httpCode: 500
      })
    }

    const dataToToken = {
      UUID: user.UUID,
      email,
      username
    }

    const jwtToken = await generateJWT(dataToToken)
    return res.status(201).json(
      {
        error: null,
        result: {
          data: {
            username,
            jwt: jwtToken
          }
        }
      }
    )
  } catch (error) {
    if (error.message === 'Usuario ya existe') {
      return next({
        error: 'BAD REQUEST',
        message: error.message,
        httpCode: 400
      })
    }
    return next(
      {
        error: 'INTERNAL ERROR',
        message: error,
        httpCode: 500
      }
    )
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next({
        error: 'BAD REQUEST',
        message: 'Datos insuficientes',
        httpCode: 400
      })
    }

    const user = await authService.login({ email, password })

    if (!user) {
      return next({
        error: 'BAD REQUEST',
        message: 'Correo electrónico/Contraseña no validas',
        httpCode: 400
      })
    }

    const dataToToken = {
      UUID: user.UUID,
      email,
      username: user.username
    }
    const jwtToken = await generateJWT(dataToToken)
    return res.status(200).json(
      {
        error: null,
        result: {
          data: {
            username: user.username,
            isAuthenticated: true,
            jwt: jwtToken
          }
        }
      }
    )
  } catch (error) {
    next({
      error: 'INTERNAL ERROR',
      message: error,
      httpCode: 500
    })
  }
}

module.exports = {
  signup,
  login
}
