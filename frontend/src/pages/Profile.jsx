import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import styles from './Profile.module.css'

const Profile = () => {
  const [showChangeButton, setShowChangeButton] = useState(false)
  const { user } = useAuth()
  const handleChange = () => {
    setShowChangeButton(!showChangeButton)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Enviando')
  }
  return (
    <section className={styles.section}>
      <div className={styles.profilePicContainer}>
        <img src={user.profilePic} alt={`Foto perfil de ${user.nombre}`} />
      </div>
      <form onSubmit={handleSubmit}>
        <label>Cambia foto de perfil: <input type='file' name='profilePic' accept="image/png, image/jpeg" onChange={handleChange} />
        </label>
        {showChangeButton && <button type='submit'>Cambiar</button>}
      </form>
    </section>
  )
}
export default Profile
