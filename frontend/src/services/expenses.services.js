import { BACKEND_ENDPOINTS } from '../constants/endpoints'

const getExpenses = async ({ userId, jwt }) => {
  const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}expenses/${userId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json()
  return { result: data?.result.data, error: data?.error }
}

const deleteExpense = async ({ expenseID, jwt }) => {
  try {
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}expenses/${expenseID}`, {
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

const updateExpense = async ({ jwt, body }) => {
  try {
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}expenses/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body
    })
    const data = await res.json()
    return { result: data?.result.data, error: data?.error }
  } catch (error) {
    return { result: null, error }
  }
}

const createExpense = async ({ jwt, body }) => {
  try {
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}expenses/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body
    })
    const data = await res.json()
    return { result: data?.result.data, error: data?.error }
  } catch (error) {
    return { result: null, error }
  }
}

export {
  getExpenses,
  deleteExpense,
  updateExpense,
  createExpense
}
