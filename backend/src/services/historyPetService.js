const PetHistory = require('../models/PetHistory')

const addOne = async ({ data }) => {
  const insertedPetId = await PetHistory.addOne({ data })

  if (!insertedPetId) {
    return null
  }

  const petHistory = await PetHistory.findOneByHistoryId(insertedPetId)
  return petHistory[0]
}

const updateOne = async ({ data }) => {
  const IDUpdatedRow = await PetHistory.updateOne({ data })

  if (!IDUpdatedRow) {
    return null
  }

  const petHistory = await PetHistory.findOneByHistoryId(IDUpdatedRow)
  return petHistory[0]
}

const deleteOne = async (historyId) => {
  const isDeleted = await PetHistory.deleteOne(historyId)

  return isDeleted
}

module.exports = {
  addOne,
  updateOne,
  deleteOne
}
