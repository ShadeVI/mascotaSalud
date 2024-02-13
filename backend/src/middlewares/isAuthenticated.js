const { isTokenValid } = require('../utils/JWT')
const authService = require('../services/authService')

const isAuthenticated = async (req, res, next) => {
  // check if token is valid
  try {
    const decodedToken = await isTokenValid(req.cookies.jwt)
    if (decodedToken) {
      res.locals.user = decodedToken
      res.locals.user.isAdmin = await authService.isAdmin(decodedToken.UUID)
      return next()
    }
    return next({
      error: 'JSON WEB TOKEN',
      message: 'Token no valido',
      code: 400
    })
  } catch (error) {
    next({
      error: 'JSON WEB TOKEN',
      message: 'Error en el token',
      code: 500
    })
  }
}

module.exports = isAuthenticated
