const express = require('express')
const { getUser, getUserPets, updateUser, deleteUser } = require('../controllers/usersController')

const userRouter = express.Router()

userRouter.get('/:username', getUser)
userRouter.get('/:username/pets', getUserPets)

userRouter.put('/:username', updateUser)
userRouter.delete('/:username', deleteUser)

module.exports = {
  userRouter
}
