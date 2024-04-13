const { db } = require('../db/connection')

class Expense {
  static async getOne (expenseID) {
    const [rows] = await db.execute('SELECT * FROM gasto WHERE ID = ?', [expenseID])
    if (rows.length > 0) return rows[0]
    return rows
  }

  static async getAll () {
    const [rows] = await db.execute('SELECT * FROM gasto ORDER BY fecha')
    return rows
  }

  static async addOne ({ data: expenseData }) {
    for (const key in expenseData) {
      if (expenseData[key] === 'null' || expenseData[key] === 'undefined' || expenseData[key] === '') {
        expenseData[key] = null
      }
    }

    const { descripcion, fecha, valor, IDmascota, UUIDusuario } = expenseData

    const [result] = await db.query('INSERT INTO gasto (descripcion, valor, fecha, UUID_usuario, ID_mascota) VALUES (?, ?, ?, ?, ?)', [descripcion, Number(valor), fecha, UUIDusuario, IDmascota])

    if (result.affectedRows > 0) {
      return result.insertId
    }

    return null
  }

  static async updateOne ({ data: expenseData }) {
    for (const key in expenseData) {
      if (expenseData[key] === 'null' || expenseData[key] === 'undefined' || expenseData[key] === '') {
        expenseData[key] = null
      }
    }

    const { ID, descripcion, fecha, valor, IDmascota } = expenseData

    const [result] = await db.query('UPDATE gasto SET descripcion = ?, fecha = ?, valor = ?, ID_mascota = ? WHERE ID = ?', [descripcion, fecha, valor, IDmascota, ID])

    if (result.affectedRows > 0) {
      return true
    }

    return null
  }

  static async deleteOne (expenseID) {
    const [result] = await db.query('DELETE FROM gasto WHERE ID = ?', [expenseID])

    if (result.affectedRows > 0) {
      return true
    }

    return null
  }
}

module.exports = Expense
