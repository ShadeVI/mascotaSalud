const addNewHistory = async ({ idPet, body, jwt }) => {
  try {
    const res = await fetch(`http://localhost:3000/pets/${idPet}/history`, {
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

const editHistory = async ({ idPet, body, jwt }) => {
  try {
    const res = await fetch(`http://localhost:3000/pets/${idPet}/history`, {
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

const deleteHistory = async ({ historyId, jwt }) => {
  try {
    const res = await fetch(`http://localhost:3000/pets/history/${historyId}`, {
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
  addNewHistory,
  editHistory,
  deleteHistory
}
