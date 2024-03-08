import { useEffect, useState, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import styles from './Profile.module.css'
import Button from '../components/Button'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import noImageProfile from '../assets/noImageProfile.png'

const Profile = () => {
  const [showChangeButton, setShowChangeButton] = useState(false)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const refInputProfileImage = useRef()
  const { user, setUser } = useAuth()

  const handleChange = (e) => {
    if (e.target.value) {
      setShowChangeButton(true)
    } else setShowChangeButton(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('profilePic', refInputProfileImage.current.files[0])
      const res = await fetch('http://localhost:3000/users/upload-photo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`
        },
        body: formData
      })
      const data = await res.json()
      if (data?.error) {
        console.log(data.error)
        return
      }
      if (data?.result) {
        const foto = data?.result.data.foto ? fotoPathBuilder({ type: 'profile', foto: data.result.data.foto }) : noImageProfile
        setResponse(data.message)
        setUser({ ...user, ...data.result.data, profilePic: foto })
        refInputProfileImage.current.value = ''
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setResponse(null)
    }, 3000)
  }, [user.foto])

  return (
    <section className={styles.section}>
      <div className={styles.profilePicContainer}>
        <img src={user.profilePic} alt={`Foto perfil de ${user.nombre}`} />
      </div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className={styles.row}>
          <label htmlFor='profilePicInput'>Nueva foto: </label>
          <input id='profilePicInput' type='file' name='profilePic' accept="image/png, image/jpeg" onChange={handleChange} ref={refInputProfileImage} />
          {showChangeButton && <Button type='submit' disabled={loading}>Cambiar foto</Button>}
        </div>
        <div className={styles.row}>
          {response && <p>{response}</p>}
        </div>
      </form>

      <form>
        {JSON.stringify(user)}
      </form>
    </section>
  )
}
export default Profile
