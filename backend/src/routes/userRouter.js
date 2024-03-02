const upload = require('../middlewares/imageProfileUploader')
const express = require('express')

const { getUser, getUserPets, updateUser, deleteUser, uploadPhotoProfile } = require('../controllers/usersController')

const userRouter = express.Router()

userRouter.get('/:username', getUser)
userRouter.get('/:username/pets', getUserPets)

userRouter.put('/:username', updateUser)
userRouter.delete('/:username', deleteUser)

userRouter.post('/upload-photo', upload.single('profilePic'), uploadPhotoProfile)

module.exports = {
  userRouter
}
