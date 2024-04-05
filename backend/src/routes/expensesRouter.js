const express = require('express')
const { getAllExpensesByUser } = require('../controllers/expensesController')

const expensesRouter = express.Router()

expensesRouter.get('/:userID', getAllExpensesByUser)

module.exports = {
  expensesRouter
}
