const express = require('express')
const { signup } = require('../controllers/authController')

const authRouter = express.Router()

authRouter.route('/sign-up').post(signup)

module.exports = {
  authRouter
}
