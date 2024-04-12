import { createContext, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { getExpenses } from '../services/expenses.services'

export const ExpensesContext = createContext()

export const ExpensesProvider = ({ children }) => {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user && user.UUID) {
      const { UUID, jwt } = user
      setIsLoading(true)
      getExpenses({ userId: UUID, jwt })
        .then((data) => {
          if (data.error) {
            console.log(data.error)
          }
          if (data) {
            setExpenses([...data])
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => setIsLoading(false))
    }
  }, [user])

  return (
    <ExpensesContext.Provider value={{ expenses, isLoading, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  )
}
