import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Expenses from './pages/Expenses'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import Navbar from './components/navbar/Navbar'
import { ROUTES } from './constants/routes'
import PetProfile from './pages/PetProfile'
import AddNewPet from './pages/AddNewPet'

function App () {
  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path={ROUTES.HOME} element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<SignUp />} />
          <Route path={ROUTES.WELCOME} element={<Welcome />} />
          <Route path={ROUTES.PROFILE} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path={`${ROUTES.PETS}/:id`} element={<ProtectedRoute><PetProfile /></ProtectedRoute>} />
          <Route path={ROUTES.NEW_PET} element={<ProtectedRoute><AddNewPet /></ProtectedRoute>} />
          <Route path={ROUTES.EXPENSES} element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
