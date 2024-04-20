import { BACKEND_ENDPOINTS } from '../constants/endpoints'

const getUserData = async ({ username, jwt }) => {
  const res = await fetch(`${BACKEND_ENDPOINTS.BASE_API_URL}users/${username}`, {
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
