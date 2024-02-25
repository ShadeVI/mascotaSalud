import { useState } from 'react'
import FormContainer from '../components/form/FormContainer'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const navigator = useNavigate()
  const { setUser } = useAuth()

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

  return (
    <section className={styles.login}>
      <FormContainer>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <div className={styles.row}>
            <label htmlFor='username' className={styles.label}>Username</label>
            <input type='text' id='username' name='username' className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div> */}
          <div className={styles.row}>
            <label htmlFor='email' className={styles.label}>Email</label>
            <input type='email' id='email' name='email' className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.row}>
            <label htmlFor='password' className={styles.label}>Password</label>
            <input type='password' id='password' name='password' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.row}>
            <button className={styles.button} disabled={isLoading}>Login</button>
          </div>
          {error && (<div className={styles.row}>
            <p className={styles.error}>{error}</p>
          </div>)}
        </form>
      </FormContainer>
    </section>
  )
}

export default Login
