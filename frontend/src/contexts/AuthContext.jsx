import { createContext, useEffect, useState } from 'react'
import { getUserData } from '../services/user.services.js'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'

const userLS = localStorage.getItem('user')

const initialContext = {
  user: userLS ? JSON.parse(userLS) : null
}

export const AuthContext = createContext(initialContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialContext.user)

  useEffect(() => {
    if (userLS) {
      const { username, jwt } = JSON.parse(userLS)
      getUserData({ username, jwt })
        .then((data) => {
          if (data.error) {
            localStorage.removeItem('user')
            window.location.reload()
            return
          }
          if (data) {
            const foto = fotoPathBuilder({ type: 'profile', foto: data.foto })
            setUser({ ...data, jwt, profilePic: foto })
          }
        })
        .catch(error => {
          console.log(error.message)
          localStorage.removeItem('user')
          window.location.reload()
        })
    }
  }, [userLS])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
