const { db } = require('../db/connection')

class PetHistory {
  static async findAll () {
    const [rows] = await db.execute('SELECT * FROM historial_mascota')
    return rows
  }

  static async findAllById (id) {
    const [rows] = await db.execute('SELECT h.ID, h.peso, h.antiparasitario, h.fecha, m.nombre FROM historial_mascota AS h INNER JOIN mascota AS m ON h.ID_mascota = m.ID WHERE m.ID = ?', [id])
    return rows
  }
}

module.exports = PetHistory
