const removeHashPassword = ({ usersArr, user }) => {
  if (usersArr) {
    return usersArr.map(user => {
      const newUser = { ...user }
      delete newUser.password_hash
      return newUser
    })
  }

  if (user) {
    const newUser = { ...user }
    delete newUser.password_hash
    return newUser
  }
}

module.exports = removeHashPassword
