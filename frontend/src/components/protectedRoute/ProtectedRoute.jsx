import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  return (
    user ? children : <Navigate to={ROUTES.WELCOME} />
  )
}
export default ProtectedRoute
