import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const navigator = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await res.json()
      if (data?.error) {
        return setError(data.error)
      }
      setUser({ ...data.result.data })
      navigator('/home')
    } catch (err) {
      setError('Error durante el login')
    }
  }

  const fetchAPI = async () => {
    const res = await fetch('http://localhost:3000/auth/checkToken', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()
    if (data.result) {
      setUser(data.result)
      navigator('/home', { replace: true })
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      LOGIN
    </>
  )
}

export default Login
