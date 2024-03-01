const { isTokenValid } = require('../utils/JWT')

const isAuthenticated = async (req, res, next) => {
  // check if token is valid
  try {
    const decodedToken = await isTokenValid(req.cookies.jwt)
    if (decodedToken) {
      res.locals.user = decodedToken
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

module.exports = isAuthenticated
