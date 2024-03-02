import logo from '../../assets/logo.png'
import styles from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const { user, setUser } = useAuth()
  const navigator = useNavigate()

  const handleLogout = async () => {
    localStorage.removeItem('user')
    setUser(null)
    navigator('/login')
  }

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
              <NavLink className={styles.link} onClick={handleLogout}>Logout</NavLink>
            </div>
            <div className={styles.user}>
              <p className={styles.userText}>Hola, <span><Link className={styles.link} to="/profile">{user && user.username}</Link></span></p>
              <Link className={styles.link} to="/profile">
                <div className={styles.userPicture}>
                  <img className={styles.photo} src='https://randomuser.me/api/portraits/women/10.jpg' alt="usuario image" />
                </div>
              </Link>
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
