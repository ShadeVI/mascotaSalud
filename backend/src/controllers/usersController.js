const userService = require('../services/userService')

const getAllUsers = async (req, res, next) => {
  const { isAdmin } = res.locals.user
  if (!isAdmin) {
    return next({
      error: 'UNAUTHORIZED',
      message: 'No tienes permisos suficientes',
      code: 401
    })
  }
  const result = await userService.findAll(isAdmin)
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

  const { UUID: requestUUID, isAdmin } = res.locals.user
  const userFound = await userService.findOne(username)

  if (!userFound) {
    return next({
      error: 'BAD REQUEST',
      message: 'Usuario no encontrado',
      code: 404
    })
  }
  if (requestUUID !== userFound.UUID && !isAdmin) {
    return next({
      error: 'BAD REQUEST',
      message: 'No tienes permisos',
      code: 401
    })
  }
  return res.json({ message: `Datos del usuario ${username}`, result: userFound })
}

const getUserPets = async (req, res, next) => {
  const { username } = req.params
  if (!username) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos insuficientes',
      code: 401
    })
  }

  // Verificar que el usuario exista
  const userFound = await userService.findOne(username)
  if (!userFound) {
    return next({
      error: 'BAD REQUEST',
      message: 'Usuario no encontrado',
      code: 404
    })
  }

  // Buscar todas las mascotas del usuario
  const pets = await userService.findAllUserPets(username)

  return res.json({ message: `Todas las mascotas de ${username}`, result: pets })
}

module.exports = {
  getAllUsers,
  getUser,
  getUserPets
}
