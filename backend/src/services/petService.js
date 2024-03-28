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

const addPet = async ({ petData, petImage, userUUID }) => {
  let petDataPrepared = {
    ...petData,
    userUUID
  }

  if (petImage) {
    petDataPrepared = { ...petDataPrepared, petImage: petImage.filename }
  }

  const insertedPetId = await Pet.addOne(petDataPrepared)

  if (!insertedPetId) {
    return null
  }

  const pet = await Pet.findById(insertedPetId)
  return pet
}

const updatePet = async ({ petData, petImage, userUUID }) => {
  let petDataPrepared = {
    ...petData
  }

  if (petImage) {
    petDataPrepared = { ...petDataPrepared, petImage: petImage.filename }
  }

  const isUpdated = await Pet.updateOne(petDataPrepared)

  if (!isUpdated) {
    return null
  }

  const pet = await Pet.findById(petDataPrepared.ID)
  return pet
}

module.exports = {
  findAll,
  findOne,
  findPetHistory,
  addPet,
  updatePet
}
