const { c } = require('../db/connection')

class User {
  static async register ({ username, email, password }) {
    const db = await c
    const result = await db.execute('INSERT INTO usuario (username, email, password_hash, ID_rol) VALUES (?, ?, ?, ?)', [username, email, password, 2])
    return result[0]

    // SQL QUERY PARA registrar usuario
  }
}

module.exports = User
