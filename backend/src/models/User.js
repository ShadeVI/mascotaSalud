const { db } = require('../db/connection')
const { hashPassword } = require('../utils/password')

class User {
  static async signup ({ username, email, password }) {
    const allUsers = await User.getAll()

    // Verificamos si no hay usuarios. Si es el primer registro, este usuario tendrá rol de Admin (1).
    let rol = 2 // usuario cliente

    if (allUsers.length === 0) {
      rol = 1 // usuario admin
    }

    // Hash password antes de insertar
    const hashPass = await hashPassword({ clearPassword: password })

    const [row] = await db.execute('INSERT INTO usuario (username, email, password_hash, ID_rol) VALUES (?, ?, ?, ?)', [username, email, hashPass, rol])
    if (row.affectedRows > 0) {
      const userData = User.findByUsername(username)
      return userData
    }
    throw new Error('Error interno al registrar el usuario')
  }

  static async getAll () {
    const [rows] = await db.execute('SELECT * FROM usuario')
    return rows
  }

  static async findByUsername (username) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE username = ?', [username])
    if (rows.length < 1) {
      return null
    }
    delete rows[0].password_hash
    return rows[0]
  }

  static async findByEmail (email) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE email = ?', [email])
    if (rows.length < 1) {
      return null
    }
    delete rows[0].password_hash
    return rows[0]
  }

  static async findPasswordHash (email) {
    const [rows] = await db.execute('SELECT password_hash FROM usuario WHERE email = ?', [email])
    if (rows.length < 1) {
      return null
    }
    return rows[0]
  }
}

module.exports = User
