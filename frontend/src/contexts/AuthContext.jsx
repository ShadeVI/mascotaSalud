import { createContext, useEffect, useState } from 'react'

const initialContext = {
  user: {}
}

export const AuthContext = createContext(initialContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const fetchAPI = async () => {
    const res = await fetch('http://localhost:3000/auth/checkToken', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()
    if (data?.result) {
      const res = await fetch(`http://localhost:3000/users/${data.result.username}`, {
        method: 'GET',
        credentials: 'include'
      })
      const user = await res.json()
      setUser(user.result)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
