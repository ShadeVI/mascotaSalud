const { db } = require('../db/connection')

class Expense {
  static async getAll () {
    const [rows] = await db.execute('SELECT * FROM gasto ORDER BY fecha')
    return rows
  }
}

module.exports = Expense
