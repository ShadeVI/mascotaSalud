import useAuth from '../hooks/useAuth'
import styles from './Profile.module.css'

const Profile = () => {
  const { user } = useAuth()
  console.log(user)
  return (
    <section className={styles.section}>
      <div className={styles.profilePicContainer}>
        <img src={user.profilePic} alt={`Foto perfil de ${user.nombre}`} />
      </div>
    </section>
  )
}
export default Profile
