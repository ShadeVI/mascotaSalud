const getUserData = async ({ username, jwt }) => {
  const res = await fetch(`http://localhost:3000/users/${username}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json()
  return data?.result?.data || data?.error
}

export {
  getUserData
}
