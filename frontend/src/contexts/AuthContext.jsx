import { createContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'

const initialContext = {
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false
}

export const AuthContext = createContext(initialContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const { result, error, isLoading } = useFetch({ url: 'http://localhost:3000/auth/checkToken' })

  useEffect(() => {
    if (result) {
      setUser(result.data)
    }
  })

  return (
    <AuthContext.Provider value={{ user, setUser, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
