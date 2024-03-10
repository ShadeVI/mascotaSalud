import { createContext, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getUserPets } from '../services/getProfileImage'

const initialContext = {
  pets: []
}

export const PetsContext = createContext(initialContext)

export const PetsProvider = ({ children }) => {
  const { user } = useAuth()
  const [pets, setPets] = useState(initialContext.pets)

  useEffect(() => {
    if (user) {
      const { username, jwt } = user
      getUserPets({ username, jwt })
        .then((data) => {
          if (data.error) {
            console.log(data.error)
          }
          if (data) {
            setPets(pets)
          }
        })
        .catch(error => console.log(error.message))
    }
  }, [user])

  return (
    <PetsContext.Provider value={{ pets, setPets }}>
      {children}
    </PetsContext.Provider>
  )
}
