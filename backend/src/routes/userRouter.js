const express = require('express')
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile_images')
  },
  filename: function (req, file, cb) {
    const filename = req.user.username + '__profile_pic'
    const extension = path.extname(file.originalname)
    const finalName = filename + extension
    cb(null, finalName)
  }
})
const upload = multer({ storage })

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
