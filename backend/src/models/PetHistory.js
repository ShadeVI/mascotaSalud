const { db } = require('../db/connection')

class PetHistory {
  static async findAll () {
    const [rows] = await db.execute('SELECT * FROM historial_mascota')
    return rows
  }

  static async findAllById (id) {
    const [rows] = await db.execute('SELECT * FROM historial_mascota WHERE ID_mascota = ?', [id])
    return rows
  }
}

module.exports = PetHistory
