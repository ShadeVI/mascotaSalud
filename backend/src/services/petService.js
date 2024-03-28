const Pet = require('../models/Pet')
const PetHistory = require('../models/PetHistory')
const path = require('node:path')
const fs = require('node:fs/promises')

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

const updatePet = async ({ petData, petImage }) => {
  let petDataPrepared = {
    ...petData
  }

  if (petImage) {
    petDataPrepared = { ...petDataPrepared, petImage: petImage.filename }
    if (petDataPrepared?.foto) {
      const pathFileToRemove = path.join('public/animal_images', petDataPrepared.foto)
      fs.rm(pathFileToRemove).then(() => console.log('IMAGEN ANTERIOR BORRADA')).catch((err) => console.log(err))
    }
  }

  const isUpdated = await Pet.updateOne(petDataPrepared)

  if (!isUpdated) {
    return null
  }

  const pet = await Pet.findById(petDataPrepared.ID)
  return pet
}

const deletePet = async (petId) => {
  const isDeleted = await Pet.deleteOne(petId)
  return isDeleted
}

module.exports = {
  findAll,
  findOne,
  findPetHistory,
  addPet,
  updatePet,
  deletePet
}
