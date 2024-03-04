import { useState } from 'react'
import FormContainer from '../components/form/FormContainer'
import styles from './Login.module.css'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Row from '../components/form/Row'
import Label from '../components/form/Label'
import Input from '../components/form/Input'
import Button from '../components/Button'
import { getUserData } from '../services/getProfileImage'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import noImage from '../assets/noimage.png'

const Login = () => {
  const navigator = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const { user, setUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:3000/auth/login',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          })
        })
      const data = await res.json()
      const { result, error } = data
      if (error) {
        return setError({ message: error?.message, code: error?.code || null })
      }
      localStorage.setItem('user', JSON.stringify(result.data))
      getUserData({ username: result.data.username, jwt: result.data.jwt })
        .then((data) => {
          const foto = data?.foto ? fotoPathBuilder(data.foto) : noImage
          setUser({ ...data, jwt: result.data.jwt, profilePic: foto })
          navigator('/', { replace: true })
        })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) return <Navigate to="/home" replace />

  return (
    <section className={styles.login}>
      <FormContainer>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Row>
            <Label htmlFor='email' text="Email" />
            <Input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </Row>
          <Row>
            <Label htmlFor='password' text="Password" />
            <Input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </Row>
          <Row>
            <Button disabled={isLoading}>Login</Button>
          </Row>
          {error && (<Row>
            <p className={styles.error}>{error}</p>
          </Row>)}
        </form>
      </FormContainer>
    </section>
  )
}

export default Login
