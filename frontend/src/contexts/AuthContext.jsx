import { createContext, useEffect, useState } from 'react'
import { getUserData } from '../services/getProfileImage'
import noImage from '../assets/noimage.png'
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
          const foto = data?.foto ? fotoPathBuilder(data.foto) : noImage
          setUser({ ...data, jwt, profilePic: foto })
        })
    }
  }, [userLS])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
