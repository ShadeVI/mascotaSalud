const Expense = require('../models/Expenses')

const getAllByUserId = async (userId) => {
  const allExpenses = await Expense.getAll()
  const userExpenses = allExpenses.filter(expense => expense.UUID_usuario === userId)
  return userExpenses
}

module.exports = {
  getAllByUserId
}
