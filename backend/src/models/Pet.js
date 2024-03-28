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
      if (petData[key] === 'null' || petData[key] === 'undefined' || petData[key] === '') {
        petData[key] = null
      }
      if (petData[key] === 'false') {
        petData[key] = false
      }
      if (petData[key] === 'true') {
        petData[key] = true
      }
    }

    const { nombre, n_chip: nChip, fecha_nac: fechaNac, tipo, raza, genero, vacuna_basica: vacBasica, petImage, userUUID } = petData

    const [result] = await db.query('INSERT INTO mascota (nombre, n_chip, fecha_nac, foto, tipo, raza, genero, vacuna_basica, UUID_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, nChip, fechaNac, petImage, tipo, raza, genero, (vacBasica ? 1 : 0), userUUID])

    if (result.affectedRows > 0) {
      return result.insertId
    }

    return null
  }

  static async updateOne (petData) {
    for (const key in petData) {
      if (petData[key] === 'null' || petData[key] === 'undefined' || petData[key] === '') {
        petData[key] = null
      }
      if (petData[key] === 'false') {
        petData[key] = false
      }
      if (petData[key] === 'true') {
        petData[key] = true
      }
    }

    const { nombre, n_chip: nChip, fecha_nac: fechaNac, foto, tipo, raza, genero, vacuna_basica: vacBasica, petImage, ID: idPet } = petData

    const [result] = await db.query('UPDATE mascota SET nombre = ?, n_chip = ?, fecha_nac = ?, foto = ?, tipo = ?, raza = ?, genero = ?, vacuna_basica = ? WHERE ID = ?', [nombre, nChip, fechaNac, petImage || foto, tipo, raza, genero, (vacBasica ? 1 : 0), idPet])

    if (result.affectedRows > 0) {
      return true
    }

    return null
  }

  static async deleteOne (petId) {
    const [result] = await db.query('DELETE FROM mascota WHERE ID = ?', [petId])
    if (result.affectedRows > 0) {
      return true
    }

    return false
  }
}

module.exports = Pet
