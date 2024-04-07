const express = require('express')
const { getAllExpensesByUser, updateExpense } = require('../controllers/expensesController')

const expensesRouter = express.Router()

expensesRouter.get('/:userID', getAllExpensesByUser)
expensesRouter.put('/', updateExpense)

module.exports = {
  expensesRouter
}
