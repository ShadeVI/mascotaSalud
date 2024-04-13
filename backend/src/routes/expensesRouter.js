const express = require('express')
const { getAllExpensesByUser, updateExpense, deleteExpense, addExpense } = require('../controllers/expensesController')

const expensesRouter = express.Router()

expensesRouter.get('/:userID', getAllExpensesByUser)
expensesRouter.post('/', addExpense)
expensesRouter.put('/', updateExpense)
expensesRouter.delete('/:expenseID', deleteExpense)

module.exports = {
  expensesRouter
}
