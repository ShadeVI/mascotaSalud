import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

function App () {
  return (
    <div className='container'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<h1>main</h1>} />
          <Route path='/a' element={<h1>second</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
