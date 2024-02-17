import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from '@pages/SignUp'
import Login from '@pages/Login'
import Home from '@pages/Home'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
