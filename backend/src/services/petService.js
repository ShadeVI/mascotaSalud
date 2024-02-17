const Pet = require('../models/Pet')
const PetHistory = require('../models/PetHistory')

const findAll = async () => {
  const allPets = await Pet.findAll()
  return allPets
}

const findOne = async (id) => {
  const pet = await Pet.findById(id)
  if (!pet) {
    return null
  }
  return pet
}

const findPetHistory = async (id) => {
  const history = await PetHistory.findAllById(id)
  return history
}

module.exports = {
  findAll,
  findOne,
  findPetHistory
}
