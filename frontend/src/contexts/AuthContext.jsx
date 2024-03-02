import { createContext, useEffect, useState } from 'react'

const initialContext = {
  user: null
}

export const AuthContext = createContext(initialContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    const userLS = localStorage.getItem('user')
    if (userLS) {
      setUser(JSON.parse(userLS))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
