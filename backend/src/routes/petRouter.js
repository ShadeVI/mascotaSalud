const express = require('express')
const { getAllPets, getPet, getPetHistory, addPet, updatePet, deletePet, addPetHistory, updatePetHistory } = require('../controllers/petController')
const upload = require('../middlewares/imagePetUploader')

const petRouter = express.Router()

petRouter.get('/', getAllPets)
petRouter.get('/:id', getPet)
petRouter.get('/:id/history', getPetHistory)

petRouter.post('/new-pet', upload.single('imagePet'), addPet)
petRouter.put('/:id', upload.single('imagePet'), updatePet)
petRouter.delete('/:id', deletePet)

petRouter.post('/:id/history', addPetHistory)
petRouter.put('/:id/history', updatePetHistory)

module.exports = {
  petRouter
}
