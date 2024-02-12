const express = require('express')
const { getAllPets, getPet } = require('../controllers/petController')

const petRouter = express.Router()

petRouter.get('/', getAllPets)
petRouter.get('/:id', getPet)

module.exports = {
  petRouter
}
