const expenseService = require('../services/ExpenseService')

const getAllExpensesByUser = async (req, res, next) => {
  try {
    const { userID } = req.params
    const { user } = res.locals
    if (user.UUID !== userID) {
      return next(
        {
          error: 'NO AUTHORIZED',
          message: 'No tienes suficientes permisos',
          httpCode: 401
        }
      )
    }
    const result = await expenseService.getAllByUserId(userID)
    return res.status(200).json({ message: 'Todos los gastos', result: { data: result } })
  } catch (err) {
    return next(err)
  }
}

const updateExpense = async (req, res, next) => {
  const { body: data } = req

  try {
    const aaa = await expenseService.updateOne({ data })

    return res.json({ message: 'Registro actualizado', result: { data: aaa } })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getAllExpensesByUser,
  updateExpense
}
