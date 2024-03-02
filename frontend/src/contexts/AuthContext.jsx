import { createContext, useEffect, useState } from 'react'
import { getUserData } from '../services/getProfileImage'
import noImage from '../assets/noimage.png'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'

const initialContext = {
  user: null
}

export const AuthContext = createContext(initialContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const userLS = localStorage.getItem('user')

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
