const express = require('express')
const { getPetsByUsername } = require('../controllers/petsController')

const petsRouter = express.Router()

petsRouter.get('/:username', getPetsByUsername)

module.exports = {
  petsRouter
}
