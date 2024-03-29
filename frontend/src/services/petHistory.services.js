const addNewHistory = async ({ idPet, body, jwt }) => {
  try {
    const res = await fetch(`http://localhost:3000/pets/${idPet}/history`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`
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
  addNewHistory
}
