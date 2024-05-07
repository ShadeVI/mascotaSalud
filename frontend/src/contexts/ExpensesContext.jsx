import { createContext, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getExpenses } from '../services/expenses.services'
import usePets from '../hooks/usePets'

export const ExpensesContext = createContext()

export const ExpensesProvider = ({ children }) => {
  const { user } = useAuth()
  const { pets } = usePets()
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user && user.UUID) {
      const { UUID, jwt } = user
      setIsLoading(true)
      getExpenses({ userId: UUID, jwt })
        .then(({ result, error }) => {
          if (error) {
            console.log(error)
          }
          if (result) {
            setExpenses([...result.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))])
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => setIsLoading(false))
    }
  }, [user, pets])

  return (
    <ExpensesContext.Provider value={{ expenses, isLoading, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  )
}
