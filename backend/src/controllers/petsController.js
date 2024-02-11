const Pet = require('../models/Pet')

const getPetsByUsername = async (req, res, next) => {
  const { username } = req.params
  const pets = await Pet.findAll(username)
  return res.json({ pets })
}

module.exports = {
  getPetsByUsername
}
