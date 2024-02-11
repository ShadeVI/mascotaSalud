const { isTokenValid } = require('../utils/JWT')

const isAuthenticated = async (req, res, next) => {
  // check if token is valid
  try {
    const decodedToken = await isTokenValid(req.cookies.jwt)
    if (decodedToken) {
      res.locals.user = decodedToken
      return next()
    }
    return next({ message: 'invalid token' })
  } catch (error) {
    next(error)
  }
}

module.exports = isAuthenticated
