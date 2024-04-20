import { BACKEND_ENDPOINTS } from '../constants/endpoints'

const addNewHistory = async ({ idPet, body, jwt }) => {
  try {
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_API_URL}pets/${idPet}/history`, {
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
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_API_URL}pets/${idPet}/history`, {
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
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_API_URL}pets/history/${historyId}`, {
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
