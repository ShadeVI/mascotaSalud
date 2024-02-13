const express = require('express')
const { getAllUsers, getUser, getUserPets } = require('../controllers/usersController')

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:username', getUser)
userRouter.get('/:username/pets', getUserPets)

module.exports = {
  userRouter
}
