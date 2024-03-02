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
    for (const key in user) {
      user[key] = user[key] === 'null' || user[key] === 'undefined' ? null : user[key]
    }
    const { email, username, nombre, apellido, fecha_nac: fechaNac, empleo, url_foto: urlFoto } = user
    const [result] = await db.execute('UPDATE usuario SET email = ?, username = ?, nombre = ?, apellido = ?, fecha_nac = ?, empleo = ?, url_foto = ? WHERE UUID = ?', [email, username, nombre, apellido, fechaNac, empleo, urlFoto, user.UUID])

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

  static async updateProfileImage (user, imageName) {
    const { UUID } = user
    const [result] = await db.execute('UPDATE usuario SET url_foto = ? WHERE UUID = ?', [imageName, UUID])

    if (result.affectedRows > 0) {
      return true
    }

    return false
  }
}

module.exports = User
