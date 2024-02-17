const petService = require('../services/petService')

const getAllPets = async (req, res, next) => {
  const { user } = res.locals
  const result = await petService.findAll()
  const allPets = result.filter(mascota => mascota.UUID_usuario === user.UUID)
  return res.status(200).json({ message: 'Todas las mascotas', result: { data: allPets } })
}

const getPet = async (req, res, next) => {
  const { id } = req.params
  if (isNaN(Number(id))) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos incorrectos',
      code: 401
    })
  }

  const pet = await petService.findOne(id)
  if (!pet) {
    return next({
      error: 'BAD REQUEST',
      message: 'Mascota no encontrada',
      code: 404
    })
  }

  const { UUID: requestUUID } = res.locals.user
  if (requestUUID !== pet.UUID_usuario) {
    return next({
      error: 'BAD REQUEST',
      message: 'No tienes permisos',
      code: 401
    })
  }
  return res.json({ message: 'Mascota encontrada', result: { data: pet } })
}

const getPetHistory = async (req, res, next) => {
  const { id } = req.params
  if (isNaN(Number(id))) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos incorrectos',
      code: 401
    })
  }

  const pet = await petService.findOne(id)
  if (!pet) {
    return next({
      error: 'BAD REQUEST',
      message: 'Mascota no encontrada',
      code: 404
    })
  }

  const { UUID: requestUUID, username } = res.locals.user
  if (requestUUID !== pet.UUID_usuario) {
    return next({
      error: 'BAD REQUEST',
      message: 'No tienes permisos',
      code: 401
    })
  }

  const petHistory = await petService.findPetHistory(pet.ID)
  return res.json({ message: `Historial completo de la mascota ${pet.nombre} del usuario ${username}`, result: { data: petHistory } })
}

module.exports = {
  getAllPets,
  getPet,
  getPetHistory
}
