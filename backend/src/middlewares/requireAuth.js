const { isTokenValid } = require('../utils/JWT')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return next({
      error: 'NO AUTH',
      message: 'Falta autorización',
      httpCode: 401
    })
  }

  const token = authorization.split(' ')[1]

  // check if token is valid
  try {
    const decodedToken = await isTokenValid(token)
    if (decodedToken) {
      res.locals.user = decodedToken
      req.user = decodedToken
      return next()
    }
    return next({
      error: 'JSON WEB TOKEN',
      message: 'Token no valido',
      httpCode: 400
    })
  } catch (error) {
    next({
      error: 'JSON WEB TOKEN',
      message: 'Error en el token',
      httpCode: 500
    })
  }
}

module.exports = requireAuth
