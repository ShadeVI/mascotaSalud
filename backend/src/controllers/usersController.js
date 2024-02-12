const userService = require('../services/userService')

const getAllUsers = async (req, res, next) => {
  const { user } = res.locals
  const result = await userService.findAll(user.rolID)
  if (!result) {
    return next({
      error: 'UNAUTHORIZED',
      message: 'No tienes permisos suficientes',
      code: 401
    })
  }
  return res.status(200).json({ message: 'Todos los usuarios', result })
}

const getUser = async (req, res, next) => {
  const { username } = req.params
  if (!username) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos insuficientes',
      code: 401
    })
  }

  const { UUID: requestUUID, rolID } = res.locals.user
  const userFound = await userService.findOne(username)

  if (!userFound) {
    return next({
      error: 'BAD REQUEST',
      message: 'Usuario no encontrado',
      code: 404
    })
  }
  if (requestUUID !== userFound.UUID && rolID !== 1) {
    return next({
      error: 'BAD REQUEST',
      message: 'No tienes permisos',
      code: 401
    })
  }
  return res.json({ message: 'Todos los usuarios', result: userFound })
}

module.exports = {
  getAllUsers,
  getUser
}
