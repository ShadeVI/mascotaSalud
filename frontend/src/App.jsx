import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import NotFound from './pages/NotFound'
import Layout from './pages/Layout'
import Profile from './pages/Profile'
import Pets from './pages/Pets'
import Expenses from './pages/Expenses'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/mascotas" element={<Pets />} />
          <Route path="/:username/gastos" element={<Expenses />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
