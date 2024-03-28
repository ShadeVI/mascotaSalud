import { createContext, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getUserPets } from '../services/pets.services'

export const PetsContext = createContext()

export const PetsProvider = ({ children }) => {
  const { user } = useAuth()
  const [pets, setPets] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addNewPetCtx = (pet) => {
    setPets(prev => [...prev, pet])
  }

  const updatePetCtx = (pet) => {
    setPets(prev => {
      const filteredPets = prev.filter(prevPet => prevPet.ID !== pet.ID)
      return [...filteredPets, pet]
    })
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
    <PetsContext.Provider value={{ pets, setPets, addNewPetCtx, updatePetCtx, isLoading }}>
      {children}
    </PetsContext.Provider>
  )
}
