const { db } = require('../db/connection')
const User = require('./User')

class Pet {
  static async findAll (username) {
    if (username) {
      const userData = await User.findByUsername(username)
      if (userData) {
        const [rows] = await db.execute('SELECT * FROM mascota WHERE UUID_usuario = ?', [userData.UUID])
        return rows
      }
    }
    return []
  }
}

module.exports = Pet
