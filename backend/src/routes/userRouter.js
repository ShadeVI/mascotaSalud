const express = require('express')
const { getAllUsers, getUser } = require('../controllers/usersController')

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:username', getUser)

module.exports = {
  userRouter
}
