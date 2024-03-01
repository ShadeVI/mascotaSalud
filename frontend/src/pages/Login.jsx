import { useState } from 'react'
import FormContainer from '../components/form/FormContainer'
import styles from './Login.module.css'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Row from '../components/form/Row'
import Label from '../components/form/Label'
import Input from '../components/form/Input'
import Button from '../components/Button'

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
      console.log(JSON.stringify({
        email,
        password
      }))
      const res = await fetch('http://localhost:3000/auth/login',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            email,
            password
          })
        })
      const data = await res.json()
      const { result, error } = data
      if (error) {
        return setError(error)
      }
      setUser(result.data)
      navigator('/')
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) return <Navigate to="/" replace />

  return (
    <section className={styles.login}>
      <FormContainer>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <div className={styles.row}>
            <label htmlFor='username' className={styles.label}>Username</label>
            <input type='text' id='username' name='username' className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div> */}
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
