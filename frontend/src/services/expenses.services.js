const getExpenses = async ({ userId, jwt }) => {
  const res = await fetch(`http://localhost:3000/expenses/${userId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json()
  return data?.result?.data || data?.error
}

const deleteExpense = async ({ expenseID, jwt }) => {
  try {
    const res = await fetch(`http://localhost:3000/expenses/${expenseID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    return { result: data?.result.data, error: data?.error }
  } catch (error) {
    return { result: null, error }
  }
}

export {
  getExpenses,
  deleteExpense
}
