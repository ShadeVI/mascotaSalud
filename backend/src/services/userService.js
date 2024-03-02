const Pet = require('../models/Pet')
const User = require('../models/User')
const removeHashPassword = require('../utils/removeHashPassword')

const findAll = async () => {
  const allUsers = await User.findAll()
  // Para seguridad no devolver password_hash
  const filteredUsers = removeHashPassword({ usersArr: allUsers })
  return filteredUsers
}

const findOne = async (username) => {
  const user = await User.findByUsername(username)
  if (!user) {
    return null
  }
  const filteredUser = removeHashPassword({ user })
  return filteredUser
}

const findAllUserPets = async (user) => {
  const pets = await Pet.findAll()
  const filteredPetsByUsername = pets.filter(pet => pet.UUID_usuario === user.UUID)
  return filteredPetsByUsername
}

const update = async (username, data) => {
  let user = await User.findByUsername(username)
  user = removeHashPassword({ user })
  const newUser = { ...user, ...data }

  const userUpdated = await User.update(newUser)

  if (!userUpdated) {
    return null
  }

  return newUser
}

const deleteOne = async (username) => {
  const user = await User.findByUsername(username)

  const userDeleted = await User.deleteOne(user)

  if (!userDeleted) {
    return null
  }

  return userDeleted
}

const updateProfileImage = async (UUID, imgName) => {
  const user = await User.findByUUID(UUID)

  const userUpdated = await User.updateProfileImage(user, imgName)

  if (!userUpdated) {
    return null
  }

  return true
}

module.exports = {
  findAll,
  findOne,
  findAllUserPets,
  update,
  deleteOne,
  updateProfileImage
}
