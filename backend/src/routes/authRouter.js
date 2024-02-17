const express = require('express')
const { signup, login, checkToken } = require('../controllers/authController')
const isAuthenticated = require('../middlewares/isAuthenticated')

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/checkToken', isAuthenticated, checkToken)

module.exports = {
  authRouter
}
