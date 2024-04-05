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

export {
  getExpenses
}
