import { useContext } from 'react'
import { ExpensesContext } from '../contexts/ExpensesContext'

const useAuth = () => {
  return useContext(ExpensesContext)
}

export default useAuth
