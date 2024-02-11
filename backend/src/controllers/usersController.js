const User = require('../models/User')

const getAllUsers = async (req, res, next) => {
  const allUsers = await User.getAll()
  return res.json({ usersCount: allUsers.length })
}

const getUser = async (req, res, next) => {
  const { username } = req.params
  const userData = await User.findByUsername(username)
  if (userData && res.locals.user.UUID === userData.UUID) {
    return res.json(userData)
  }
  return next({ message: 'no tienes permisos', httpCode: 403 })
}

module.exports = {
  getAllUsers,
  getUser
}
