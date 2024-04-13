const Expense = require('../models/Expenses')

const getOne = async (expenseID) => {
  const expense = await Expense.getOne(expenseID)
  return expense
}

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
  const updatedExpense = await Expense.getOne(data.ID)
  return updatedExpense
}

const deleteOne = async (expenseID) => {
  const isDeleted = await Expense.deleteOne(expenseID)

  if (!isDeleted) {
    return false
  }

  return true
}

module.exports = {
  getOne,
  getAllByUserId,
  updateOne,
  deleteOne
}
