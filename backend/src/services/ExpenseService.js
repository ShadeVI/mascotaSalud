const Expense = require('../models/Expenses')

const getAllByUserId = async (userId) => {
  const allExpenses = await Expense.getAll()
  const userExpenses = allExpenses.filter(expense => expense.UUID_usuario === userId)
  return userExpenses
}

const updateOne = async ({ data }) => {
  const isUpdated = await Expense.updateOne({ data })

  if (!isUpdated) {
    return false
  }

  return true
}

module.exports = {
  getAllByUserId,
  updateOne
}
