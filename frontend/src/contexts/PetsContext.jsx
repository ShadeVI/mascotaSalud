import { createContext, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getUserPets } from '../services/pets.services'

const initialContext = {
  pets: []
}

export const PetsContext = createContext(initialContext)

export const PetsProvider = ({ children }) => {
  const { user } = useAuth()
  const [pets, setPets] = useState(initialContext.pets)
  const [isLoading, setIsLoading] = useState(false)

  const addNewPetCtx = (pet) => {
    setPets(prev => [...pets, pet])
  }

  useEffect(() => {
    if (user) {
      const { username, jwt } = user
      setIsLoading(true)
      getUserPets({ username, jwt })
        .then((data) => {
          if (data.error) {
            console.log(data.error)
          }
          if (data) {
            setPets([...data])
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => setIsLoading(false))
    }
  }, [user])

  return (
    <PetsContext.Provider value={{ pets, setPets, addNewPetCtx, isLoading }}>
      {children}
    </PetsContext.Provider>
  )
}
