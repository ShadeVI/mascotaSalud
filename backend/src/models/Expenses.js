const { db } = require('../db/connection')

class Expense {
  static async getAll () {
    const [rows] = await db.execute('SELECT * FROM gasto ORDER BY fecha')
    return rows
  }

  static async updateOne ({ data: expenseData }) {
    for (const key in expenseData) {
      if (expenseData[key] === 'null' || expenseData[key] === 'undefined' || expenseData[key] === '') {
        expenseData[key] = null
      }
    }

    const { ID, descripcion, fecha, valor, IDmascota } = expenseData

    const [result] = await db.query('UPDATE gasto SET descripcion = ?, fecha = ?, valor = ?, ID_mascota = ? WHERE ID = ?', [descripcion, fecha, valor, IDmascota, ID])
    console.log(result)
    if (result.affectedRows > 0) {
      return true
    }

    return null
  }
}

module.exports = Expense
