import { useEffect, useState, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import styles from './Profile.module.css'
import Button from '../components/Button'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { formatDateYYYYmmdd } from '../utils/formatDate'
import noImageProfile from '../assets/noImageProfile.png'
import { FaUser, FaCalendarCheck, FaCalendar } from 'react-icons/fa'
import { MdWork, MdDriveFileRenameOutline, MdEmail } from 'react-icons/md'
import SectionVertical from '../components/SectionVertical'
import { BACKEND_ENDPOINTS } from '../constants/endpoints'

const Profile = () => {
  const [showChangeButton, setShowChangeButton] = useState(false)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isFormOnlyReading, setIsFormOnlyReading] = useState(true)
  const [formProfile, setFormProfile] = useState({
    fecha_registro: '',
    username: '',
    email: '',
    nombre: '',
    apellido: '',
    fecha_nac: '',
    empleo: ''
  })
  const refInputProfileImage = useRef()
  const refUserProfileForm = useRef()
  const { user, setUser } = useAuth()

  const handleChange = (e) => {
    e.target.value
      ? setShowChangeButton(true)
      : setShowChangeButton(false)
  }

  const handleChangeInputProfile = (e) => {
    setFormProfile((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmitImageProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('profilePic', refInputProfileImage.current.files[0])
      const res = await fetch(`${BACKEND_ENDPOINTS.BASE_API_URL}/users/upload-photo`, {
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(refUserProfileForm.current)
      const jsonFormData = JSON.stringify(Object.fromEntries(formData.entries()))
      const res = await fetch(`${BACKEND_ENDPOINTS.BASE_API_URL}/users/${user.username}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          'Content-Type': 'application/json'
        },
        body: jsonFormData
      })
      const data = await res.json()
      if (data?.error) {
        console.log(data.error)
        return
      }
      if (data?.result) {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify({ username: data.result.data.username, jwt: data.result.jwt }))
        setUser({ ...user, ...data.result.data, jwt: data.result.jwt })
        setIsFormOnlyReading(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setIsFormOnlyReading(true)
    setFormProfile({
      fecha_registro: formatDateYYYYmmdd(user.fecha_registro) || '',
      username: user.username || '',
      email: user.email || '',
      nombre: user.nombre || '',
      apellido: user.apellido || '',
      fecha_nac: formatDateYYYYmmdd(user.fecha_nac) || '',
      empleo: user.empleo || ''
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setResponse(null)
    }, 3000)
  }, [user.foto])

  useEffect(() => {
    setFormProfile({
      fecha_registro: formatDateYYYYmmdd(user.fecha_registro) || '',
      username: user.username || '',
      email: user.email || '',
      nombre: user.nombre || '',
      apellido: user.apellido || '',
      fecha_nac: formatDateYYYYmmdd(user.fecha_nac) || '',
      empleo: user.empleo || ''
    })
  }, [user])

  return (
    <SectionVertical>
      <div className={styles.profilePicContainer}>
        <img src={user.profilePic} alt={`Foto perfil de ${user.nombre}`} />
      </div>
      <form className={styles.form_image} onSubmit={handleSubmitImageProfile} encType='multipart/form-data'>
        <div className={styles.row}>
          <label htmlFor='profilePicInput'>Nueva foto: </label>
          <input id='profilePicInput' type='file' name='profilePic' accept="image/png, image/jpeg" onChange={handleChange} ref={refInputProfileImage} />
          {showChangeButton && <Button type='submit' disabled={loading}>Cambiar foto</Button>}
        </div>
        <div className={styles.row}>
          {response && <p>{response}</p>}
        </div>
      </form>
      <h2>Mi perfil</h2>
      <form className={styles.form_edit} ref={refUserProfileForm}>
        <div className={styles.row_edit}>
          <label htmlFor='fecha_registro'><FaCalendarCheck /> Registrado el
          </label>
          <input type='date' disabled={true} id='fecha_registro' name='fecha_registro' value={formProfile.fecha_registro} onChange={handleChangeInputProfile} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='username'><FaUser /> Username
          </label>
          <input type='text' disabled={isFormOnlyReading} id='username' name='username' value={formProfile.username} onChange={handleChangeInputProfile} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='email'><MdEmail /> Email
          </label>
          <input type='email' disabled={isFormOnlyReading} id='email' name='email' value={formProfile.email} onChange={handleChangeInputProfile} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='nombre'><MdDriveFileRenameOutline /> Nombre
          </label>
          <input type='text' disabled={isFormOnlyReading} id='nombre' name='nombre' value={formProfile.nombre} onChange={handleChangeInputProfile} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='apellido'><MdDriveFileRenameOutline /> Apellido
          </label>
          <input type='text' disabled={isFormOnlyReading} id='apellido' name='apellido' value={formProfile.apellido} onChange={handleChangeInputProfile} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='fecha_nac'><FaCalendar /> Fecha de nacimiento
          </label>
          <input type='date' disabled={isFormOnlyReading} id='fecha_nac' name='fecha_nac' value={formProfile.fecha_nac} onChange={handleChangeInputProfile} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='empleo'><MdWork /> Empleo
          </label>
          <input type='text' disabled={isFormOnlyReading} id='empleo' name='empleo' value={formProfile.empleo} onChange={handleChangeInputProfile} />
        </div>
        {
          !isFormOnlyReading &&
          (<div style={{ display: 'flex', gap: '15px' }}>
            <Button type='button' onClick={handleCancel}>Anular</Button>
            <Button type='submit' onClick={handleUpdate}>Actualizar</Button>
          </div>)
        }
      </form>
      {isFormOnlyReading && (
        <Button type='button' onClick={() => setIsFormOnlyReading(false)}>Modificar</Button>

      )}
    </SectionVertical>
  )
}
export default Profile
