const { db } = require('../db/connection')

class User {
  static async findAll () {
    const [rows] = await db.execute('SELECT * FROM usuario')
    return rows
  }

  static async save ({ username, email, hashPass }) {
    const [result] = await db.execute('INSERT INTO usuario (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashPass])

    if (result.affectedRows > 0) {
      return true
    }

    return false
  }

  static async findByUUID (UUID) {
    const [rows] = await db.execute('SELECT * FROM usuario WHERE UUID = ?', [UUID])
    if (rows.length < 1) {
      return null
    }
    return rows[0]
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
    for (const key in user) {
      user[key] = user[key] === 'null' || user[key] === 'undefined' || user[key] === '' ? null : user[key]
    }
    const { UUID, email, username, nombre, apellido, fecha_nac: fechaNac, empleo } = user
    const [result] = await db.execute('UPDATE usuario SET email = ?, username = ?, nombre = ?, apellido = ?, fecha_nac = ?, empleo = ? WHERE UUID = ?', [email, username, nombre, apellido, fechaNac, empleo, UUID])

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

  static async updateProfileImage (UUID, imageName) {
    const [result] = await db.execute('UPDATE usuario SET foto = ? WHERE UUID = ?', [imageName, UUID])

    if (result.affectedRows > 0) {
      return true
    }

    return false
  }
}

module.exports = User
