const Pet = require('../models/Pet')

const findAll = async (user) => {
  let allPets = await Pet.findAll()
  if (user.rolID !== 1) {
    allPets = allPets.filter(mascota => mascota.UUID_usuario === user.UUID)
  }
  return allPets
}

const findOne = async (id) => {
  const pet = await Pet.findById(id)
  if (!pet) {
    return null
  }
  return pet
}

module.exports = {
  findAll,
  findOne
}
