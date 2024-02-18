import logo from '@assets/logo.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import Container from '../components/Container'
import Input from '../components/Input'
import Button from '../components/Button'
import Label from '../components/Label'
import FormContainer from '../components/Containers/Form'
import FormHeader from '../components/FormHeader'

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
    <Container>
      <main className={'h-full flex justify-center items-center'}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-opacity-30 bg-white">
          <FormHeader logo={logo}>
            Bienvenido!
          </FormHeader>

          <FormContainer>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-2">
                  <Input id="email" name="email" type="email" autoComplete="email" required={true} value={email} handleChange={ (e) => setEmail(e.target.value) } />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                </div>
                <div className="mt-2">
                  <Input id="password" name="password" type="password" required={true} value={password} handleChange={ (e) => setPassword(e.target.value) } />
                </div>
              </div>

              {error && (
                <p>{error}</p>
              )}

              <div>
                  <Button type="submit">Login</Button>
              </div>
            </form>

          </FormContainer>

        </div>
      </main>
    </Container>
  )
}

export default Login
