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
      httpCode: 400
    })
  }

  const pet = await petService.findOne(id)
  if (!pet) {
    return next({
      error: 'NOT FOUND',
      message: 'Mascota no encontrada',
      httpCode: 404
    })
  }

  const { UUID: requestUUID } = res.locals.user
  if (requestUUID !== pet.UUID_usuario) {
    return next({
      error: 'UNAUTHORIZED',
      message: 'No tienes permisos',
      httpCode: 401
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
      httpCode: 400
    })
  }

  const pet = await petService.findOne(id)
  if (!pet) {
    return next({
      error: 'NOT FOUND',
      message: 'Mascota no encontrada',
      httpCode: 404
    })
  }

  const { UUID: requestUUID, username } = res.locals.user
  if (requestUUID !== pet.UUID_usuario) {
    return next({
      error: 'BAD REQUEST',
      message: 'No tienes permisos',
      httpCode: 400
    })
  }

  const petHistory = await petService.findPetHistory(pet.ID)
  return res.json({ message: `Historial completo de la mascota ${pet.nombre} del usuario ${username}`, result: { data: petHistory } })
}

const addPet = async (req, res, next) => {
  const { body: data } = req
  const file = req?.file
  const { UUID: userUUID } = res.locals.user
  try {
    const newPet = await petService.addPet({ petData: data, petImage: file, userUUID })

    return res.json({ message: 'Mascota añadida', result: { data: newPet } })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return next({
        error: 'BAD REQUEST',
        message: 'Numero de chip no valido o ya existe',
        httpCode: 400
      })
    }
    return next(error)
  }
}

const updatePet = async (req, res, next) => {
  const { body: data } = req
  const file = req?.file
  const { UUID: userUUID } = res.locals.user
  try {
    const updatedPet = await petService.updatePet({ petData: data, petImage: file, userUUID })

    return res.json({ message: 'Mascota actualizada', result: { data: updatedPet } })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllPets,
  getPet,
  getPetHistory,
  addPet,
  updatePet
}
