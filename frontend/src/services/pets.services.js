const getUserPets = async ({ username, jwt }) => {
  const res = await fetch(`http://localhost:3000/users/${username}/pets`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json()
  return data?.result?.data || data?.error
}

export {
  getUserPets
}
