const express = require('express')
const { getPetHistory, addPetHistory, updatePetHistory, deletePetHistory } = require('../controllers/petController')

const petHistoryRouter = express.Router()

petHistoryRouter.get('/:id/history', getPetHistory)
petHistoryRouter.post('/:id/history', addPetHistory)
petHistoryRouter.put('/:id/history', updatePetHistory)
petHistoryRouter.delete('/history/:historyID', deletePetHistory)

module.exports = {
  petHistoryRouter
}
