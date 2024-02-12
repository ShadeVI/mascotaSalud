const petService = require('../services/petService')

const getAllPets = async (req, res, next) => {
  const { user } = res.locals
  const result = await petService.findAll(user)
  return res.status(200).json({ message: 'Todas las mascotas', result })
}

const getPet = async (req, res, next) => {
  const { id } = req.params
  if (isNaN(Number(id))) {
    return next({
      error: 'BAD REQUEST',
      message: 'Datos inscorrectos',
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

  const { UUID: requestUUID, isAdmin } = res.locals.user
  if (requestUUID !== pet.UUID_usuario && !isAdmin) {
    return next({
      error: 'BAD REQUEST',
      message: 'No tienes permisos',
      code: 401
    })
  }
  return res.json({ message: 'Mascota encontrada', result: pet })
}

module.exports = {
  getAllPets,
  getPet
}
