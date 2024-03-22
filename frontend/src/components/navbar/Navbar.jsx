import logo from '../../assets/logo.png'
import styles from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'
import RoundedImage from '../RoundedImage'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { fotoPathBuilder } from '../../utils/fotoPathBuilder'

const Navbar = () => {
  const { user, setUser } = useAuth()
  const navigator = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigator('/login', {
      replace: true
    })
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
              <NavLink className={styles.link} to={ROUTES.HOME}>Home</NavLink>
              <NavLink className={styles.link} to={ROUTES.PETS_OVERVIEW}>Visión global</NavLink>
              <NavLink className={styles.link} to={ROUTES.EXPENSES}>Gastos</NavLink>
            </div>
            <div className={styles.user}>
              <p className={styles.userText}>Hola,
                <span>
                  <Link className={styles.link} to={ROUTES.PROFILE}>{user && user.username}</Link>
                </span>
                <Link className={styles.link} onClick={handleLogout}><AiOutlinePoweroff /></Link>
              </p>
              <RoundedImage width={'60px'} height={'60px'} borderRadius='100%' src={fotoPathBuilder({ type: 'profile', foto: user.foto })} alt={user.username} />
            </div>
          </>
          )
        : (
          <div className={styles.links}>
            <NavLink className={styles.link} to={ROUTES.LOGIN}>login</NavLink>
            <NavLink className={styles.link} to={ROUTES.SIGNUP}>register</NavLink>
          </div>
          )
      }

    </nav>
  )
}
export default Navbar
