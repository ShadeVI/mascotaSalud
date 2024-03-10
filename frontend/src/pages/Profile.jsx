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
      <form className={styles.form_image} onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className={styles.row}>
          <label htmlFor='profilePicInput'>Nueva foto: </label>
          <input id='profilePicInput' type='file' name='profilePic' accept="image/png, image/jpeg" onChange={handleChange} ref={refInputProfileImage} />
          {showChangeButton && <Button type='submit' disabled={loading}>Cambiar foto</Button>}
        </div>
        <div className={styles.row}>
          {response && <p>{response}</p>}
        </div>
      </form>
      <h2>Información de usuario</h2>
      <form className={styles.form_edit}>
      <div className={styles.row_edit}>
          <label htmlFor='fecha_registro_i'>Registrado el:
          </label>
          <input type='text' disabled={true} name='fecha_registro' />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='nombre_i'>Nombre:
          </label>
          <input type='text' disabled={true} name='nombre' />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='apellido_i'>Apellido:
          </label>
          <input type='text' disabled={true} name='apellido' />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='username_i'>Username:
          </label>
          <input type='text' disabled={true} name='username' />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='email_i'>Email:
          </label>
          <input type='email' disabled={true} name='email' />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='fecha_nac_i'>Fecha de nacimiento:
          </label>
          <input type='text' disabled={true} name='fecha_nac' />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='empleo_i'>Empleo:
          </label>
          <input type='text' disabled={true} name='empleo' />
        </div>
      </form>
    </section>
  )
}
export default Profile
