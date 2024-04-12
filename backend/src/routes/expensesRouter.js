const express = require('express')
const { getAllExpensesByUser, updateExpense, deleteExpense } = require('../controllers/expensesController')

const expensesRouter = express.Router()

expensesRouter.get('/:userID', getAllExpensesByUser)
expensesRouter.put('/', updateExpense)
expensesRouter.delete('/:expenseID', deleteExpense)

module.exports = {
  expensesRouter
}
