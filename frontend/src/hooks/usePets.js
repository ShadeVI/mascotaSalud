import { useContext } from 'react'
import { PetsContext } from '../contexts/PetsContext'

const useAuth = () => {
  return useContext(PetsContext)
}

export default useAuth
