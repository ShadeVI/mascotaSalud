const PetHistory = require('../models/PetHistory')

const addOne = async ({ data }) => {
  const insertedPetId = await PetHistory.addOne({ data })

  if (!insertedPetId) {
    return null
  }

  const petHistory = await PetHistory.findOneByHistoryId(insertedPetId)
  return petHistory[0]
}

module.exports = {
  addOne
}
