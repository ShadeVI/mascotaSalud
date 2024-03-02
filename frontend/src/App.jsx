import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Pets from './pages/Pets'
import Expenses from './pages/Expenses'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import Navbar from './components/navbar/Navbar'

function App () {
  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/mascotas/:id" element={<ProtectedRoute><Pets /></ProtectedRoute>} />
          <Route path="/gastos" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
