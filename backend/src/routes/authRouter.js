const express = require('express')
const { signup, login } = require('../controllers/authController')

const authRouter = express.Router()

authRouter.post('/sign-up', signup)
authRouter.post('/log-in', login)

module.exports = {
  authRouter
}
