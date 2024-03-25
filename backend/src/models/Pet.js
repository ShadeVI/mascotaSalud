const { db } = require('../db/connection')

class Pet {
  static async findAll () {
    const [rows] = await db.execute('SELECT * FROM mascota')
    return rows
  }

  static async findById (id) {
    const [rows] = await db.execute('SELECT * FROM mascota WHERE ID = ?', [id])
    return rows[0]
  }

  static async findAllByUserId (id) {
    const [rows] = await db.execute('SELECT * FROM mascota WHERE UUID_usuario = ?', [id])
    return rows
  }

  static async addOne (petData) {
    for (const key in petData) {
      petData[key] = petData[key] === 'null' || petData[key] === 'undefined' || petData[key] === '' ? null : petData[key]
    }

    const { nombre, n_chip: nChip, fecha_nac: fechaNac, tipo, raza, genero, vacuna_basica: vacBasica, petImage, userUUID } = petData

    const [result] = await db.query('INSERT INTO mascota (nombre, n_chip, fecha_nac, foto, tipo, raza, genero, vacuna_basica, UUID_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, nChip, fechaNac, petImage, tipo, raza, genero, vacBasica ? 1 : 0, userUUID])

    if (result.affectedRows > 0) {
      return result.insertId
    }

    return null
  }
}

module.exports = Pet
