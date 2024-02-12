const removeHashPassword = ({ arr, user }) => {
  if (arr) {
    return arr.map(user => {
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
