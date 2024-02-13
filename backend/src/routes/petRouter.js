const express = require('express')
const { getAllPets, getPet, getPetHistory } = require('../controllers/petController')

const petRouter = express.Router()

petRouter.get('/', getAllPets)
petRouter.get('/:id', getPet)
petRouter.get('/:id/history', getPetHistory)

module.exports = {
  petRouter
}
