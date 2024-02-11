const JWT = require('jsonwebtoken')

const generateJWT = async (payload) => {
  const token = JWT.sign(payload, process.env.JWT_TOKEN, { expiresIn: '2d' })
  if (!token) {
    throw new Error('Error en el token JWT')
  }
  return token
}

const isTokenValid = async (token) => {
  const decodedToken = JWT.verify(token, process.env.JWT_TOKEN)
  if (decodedToken) {
    return decodedToken
  }
  return false
}

module.exports = { generateJWT, isTokenValid }
