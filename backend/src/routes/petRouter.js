const express = require('express')
const { getAllPets, getPet, getPetHistory } = require('../controllers/petController')
const upload = require('../middlewares/imagePetUploader')

const petRouter = express.Router()

petRouter.get('/', getAllPets)
petRouter.get('/:id', getPet)
petRouter.get('/:id/history', getPetHistory)

petRouter.post('/new-pet', upload.single('imagePet'), (req, res) => {
  return res.json({
    result: {
      msg: 'POST DATA PET'
    }
  })
})

module.exports = {
  petRouter
}
