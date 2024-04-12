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
  const { user } = res.locals
  if (user.UUID !== data.UUIDusuario) {
    return next(
      {
        error: 'NO AUTHORIZED',
        message: 'No tienes suficientes permisos',
        httpCode: 401
      }
    )
  }
  try {
    const updated = await expenseService.updateOne({ data })

    return res.json({ message: 'Registro actualizado', result: { data: updated } })
  } catch (error) {
    return next(error)
  }
}

const deleteExpense = async (req, res, next) => {
  const { expenseID } = req.params
  const { user } = res.locals

  try {
    const expenseToDelete = await expenseService.getOne(expenseID)
    if (user.UUID !== expenseToDelete.UUID_usuario) {
      return next(
        {
          error: 'NO AUTHORIZED',
          message: 'No tienes suficientes permisos',
          httpCode: 401
        }
      )
    }
    const deleted = await expenseService.deleteOne(expenseID)

    return res.json({ message: 'Registro eliminado', result: { data: deleted } })
  } catch (error) {
    if (error === 'NO AUTHORIZED') {
      return next(
        {
          error: 'NO AUTHORIZED',
          message: 'No tienes suficientes permisos',
          httpCode: 401
        }
      )
    }
    return next(error)
  }
}

module.exports = {
  getAllExpensesByUser,
  updateExpense,
  deleteExpense
}
