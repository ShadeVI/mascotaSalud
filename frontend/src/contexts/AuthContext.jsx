import { createContext, useEffect, useState } from 'react'

const initialContext = {
  user: null
}

export const AuthContext = createContext(initialContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await fetch('http://localhost:3000/auth/checkToken', {
          method: 'GET',
          credentials: 'include'
        })
        const data = await res.json()
        setUser(data.result)
      } catch (error) {
        setUser(initialContext)
      }
    }
    fetchAPI()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
