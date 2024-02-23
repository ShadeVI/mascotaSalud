import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from '@pages/SignUp'
import Login from '@pages/Login'
import Home from '@pages/Home'
import Welcome from '@pages/Welcome'
import NotFound from '@pages/NotFound'

function App () {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
