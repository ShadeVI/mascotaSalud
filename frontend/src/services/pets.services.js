import { BACKEND_ENDPOINTS } from '../constants/endpoints'

const getUserPets = async ({ username, jwt }) => {
  const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}users/${username}/pets`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json()
  return data?.result?.data || data?.error
}

const getPetHistory = async ({ idPet, jwt }) => {
  const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}pets/${idPet}/history`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json()
  return data?.result?.data || data?.error
}

const addNewPet = async ({ body, jwt }) => {
  try {
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}pets/new-pet`, {
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

const updatePet = async ({ idPet, body, jwt }) => {
  try {
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}pets/${idPet}`, {
      method: 'PUT',
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

const deletePet = async ({ idPet, jwt }) => {
  try {
    const res = await fetch(`${BACKEND_ENDPOINTS.BASE_URL}pets/${idPet}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    const data = await res.json()
    return { result: data?.result.data, error: data?.error }
  } catch (error) {
    return { result: null, error }
  }
}

export {
  getUserPets,
  getPetHistory,
  addNewPet,
  updatePet,
  deletePet
}
