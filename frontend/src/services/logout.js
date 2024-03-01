export const logout = async () => {
  try {
    const res = await fetch('http://localhost:3000/auth/logout', {
      credentials: 'include'
    })
    const data = await res.json()

    return data
  } catch (error) {
    return null
  }
}
