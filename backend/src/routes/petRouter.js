const express = require('express')
const { getAllPets, getPet, getPetHistory, addPet, updatePet } = require('../controllers/petController')
const upload = require('../middlewares/imagePetUploader')

const petRouter = express.Router()

petRouter.get('/', getAllPets)
petRouter.get('/:id', getPet)
petRouter.get('/:id/history', getPetHistory)

petRouter.post('/new-pet', upload.single('imagePet'), addPet)

petRouter.put('/:id', updatePet)

module.exports = {
  petRouter
}
