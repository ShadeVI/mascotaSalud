const User = require('../models/User')

const signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body
    const result = await User.register({ email, password, username })
    // respuesta server
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup
}
