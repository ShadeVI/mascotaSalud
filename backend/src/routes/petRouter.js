const express = require('express')
const { getAllPets, getPet, addPet, updatePet, deletePet } = require('../controllers/petController')
const upload = require('../middlewares/imagePetUploader')

const petRouter = express.Router()

petRouter.get('/', getAllPets)
petRouter.get('/:id', getPet)

petRouter.post('/new-pet', upload.single('imagePet'), addPet)
petRouter.put('/:id', upload.single('imagePet'), updatePet)
petRouter.delete('/:id', deletePet)

module.exports = {
  petRouter
}
