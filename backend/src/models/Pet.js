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
}

module.exports = Pet
