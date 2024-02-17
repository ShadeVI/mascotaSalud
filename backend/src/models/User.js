const { db } = require('../db/connection')

class User {
  static async findAll () {
    const [rows] = await db.execute('SELECT * FROM usuario')
    return rows
  }

  static async save ({ username, email, hashPass, rol }) {
    const [result] = await db.execute('INSERT INTO usuario (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashPass])

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

  static async update (user) {
    const entries = Object.entries(user)
    const values = entries.map(row => row[1] === 'null' || row[1] === 'undefined' ? null : row[1])
    const [result] = await db.execute('UPDATE usuario SET UUID = ?, email = ?, username = ?, nombre = ?, apellido = ?, fecha_nac = ?, empleo = ?, url_foto = ?, fecha_registro = ? WHERE UUID = ?', [...values, user.UUID])

    if (result.affectedRows > 0) {
      return true
    }

    return false
  }

  static async deleteOne (user) {
    const [result] = await db.execute('DELETE FROM usuario WHERE UUID = ?', [user.UUID])

    if (result.affectedRows > 0) {
      return true
    }

    return false
  }
}

module.exports = User
