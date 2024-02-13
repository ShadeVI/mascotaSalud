const { db } = require('../db/connection')

class User {
  static async findAll () {
    const [rows] = await db.execute('SELECT * FROM usuario')
    return rows
  }

  static async save ({ username, email, hashPass, rol }) {
    const [result] = await db.execute('INSERT INTO usuario (username, email, password_hash, ID_rol) VALUES (?, ?, ?, ?)', [username, email, hashPass, rol])

    if (result.affectedRows > 0) {
      return true
    }

    return false
  }

  static async findByUsername (username) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE username = ?', [username])
    if (rows.length < 1) {
      return null
    }
    return rows[0]
  }

  static async findByEmail (email) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE email = ?', [email])

    if (rows.length < 1) {
      return null
    }
    return rows[0]
  }
}

module.exports = User
