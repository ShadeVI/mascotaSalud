const userService = require('../services/userService')

const getUser = async (req, res, next) => {
  const { username } = req.params
  const { user } = res.locals

  if (!username) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos insuficientes',
      httpCode: 401
    })
  }

  const userFound = await userService.findOne(username)

  if (username !== user.username) {
    return next({
      error: 'NO AUTORIZADO',
      message: 'No tienes permisos',
      httpCode: 401
    })
  }

  if (!userFound) {
    return next({
      error: 'NOT FOUND',
      message: 'Usuario no encontrado',
      httpCode: 404
    })
  }

  return res.json({ message: `Datos del usuario ${username}`, result: { data: userFound } })
}

const getUserPets = async (req, res, next) => {
  const { username } = req.params
  const { user } = res.locals

  if (!username) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos insuficientes',
      httpCode: 401
    })
  }

  // Verificar que el usuario exista
  const userFound = await userService.findOne(username)
  if (!userFound) {
    return next({
      error: 'BAD REQUEST',
      message: 'Usuario no encontrado',
      httpCode: 404
    })
  }
  if (username !== user.username) {
    return next({
      error: 'NO AUTORIZADO',
      message: 'No tienes permisos',
      httpCode: 401
    })
  }

  // Buscar todas las mascotas del usuario
  const pets = await userService.findAllUserPets(user)

  return res.json({ message: `Todas las mascotas de ${username}`, result: { data: pets } })
}

const updateUser = async (req, res, next) => {
  const { username } = req.params
  const { user } = res.locals
  const { body: data } = req

  if (!username) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos insuficientes',
      httpCode: 401
    })
  }

  if (username !== user.username) {
    return next({
      error: 'NO AUTORIZADO',
      message: 'No tienes permisos',
      httpCode: 401
    })
  }

  const userFound = await userService.update(username, data)

  if (!userFound) {
    return next({
      error: 'NOT FOUND',
      message: 'Usuario no encontrado',
      httpCode: 404
    })
  }

  return res.json({ message: `Datos del usuario ${username}`, result: { data: userFound } })
}

const deleteUser = async (req, res, next) => {
  const { username } = req.params
  const { user } = res.locals

  if (!username) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos insuficientes',
      httpCode: 401
    })
  }

  if (username !== user.username) {
    return next({
      error: 'NO AUTORIZADO',
      message: 'No tienes permisos',
      httpCode: 401
    })
  }

  const userDeleted = await userService.deleteOne(username)

  if (!userDeleted) {
    return next({
      error: 'NOT FOUND',
      message: 'Usuario no encontrado',
      httpCode: 404
    })
  }

  return res.json({ message: `Datos del usuario ${username}`, result: { data: userDeleted } })
}

const uploadPhotoProfile = async (req, res, next) => {
  if (!req.file) {
    console.log('No file provided')
    return res.status(400).json({ msg: 'falta imagen' })
  }

  // TODO: ACTUALIZAR BD llamando al servicio
  const { user } = res.locals
  const resultUpdate = await userService.updateProfileImage(user.username, req.file.filename)
  if (!resultUpdate) {
    return res.status(500).json({ msg: 'error cargando la imagen' })
  }

  return res.status(200).json({ msg: 'uploaded' })
}

module.exports = {
  getUser,
  getUserPets,
  updateUser,
  deleteUser,
  uploadPhotoProfile
}
