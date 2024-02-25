import logo from '../../assets/logo.png'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { user } = useAuth()

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img className={styles.logoPicture} src={logo} alt="Mascota Salud" />
      </div>
      {user
        ? (
        <>
          <div className={styles.links}>
            <NavLink className={styles.link} to="/">Home</NavLink>
            <NavLink className={styles.link} to="/gastos">Gastos</NavLink>
            <NavLink className={styles.link} to="/logout">Logout</NavLink>
          </div>
          <div className={styles.user}>
            <p className={styles.userText}>Hola, <span>{user && user.username}</span></p>
            <div className={styles.userPicture}>
              <img className={styles.photo} src='https://randomuser.me/api/portraits/women/10.jpg' alt="usuario image" />
            </div>
          </div>
        </>
          )
        : (
        <div className={styles.links}>
            <NavLink className={styles.link} to="/login">login</NavLink>
            <NavLink className={styles.link} to="/sign-up">register</NavLink>
          </div>
          )
      }

    </nav>
  )
}
export default Navbar
