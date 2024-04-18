import logo from '../../assets/logo.png'
import styles from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { ROUTES } from '../../constants/routes'
import RoundedImage from '../RoundedImage'
import { AiOutlinePoweroff, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { fotoPathBuilder } from '../../utils/fotoPathBuilder'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from '../../utils/responsive'

const Navbar = () => {
  const { user, setUser } = useAuth()
  const navigator = useNavigate()
  const mobileLinks = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMobileMenu = () => {
    isMobile() && mobileLinks.current.classList.toggle(styles.show)
    setIsMenuOpen(prev => !prev)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigator(ROUTES.LOGIN, {
      replace: true
    })
  }

  useEffect(() => {
    const handler = () => {
      if (!isMobile() && isMenuOpen) {
        mobileLinks.current.classList.remove(styles.show)
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [isMenuOpen])

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <div className={styles.logoContainer}>
          <img className={styles.logoPicture} src={logo} alt="Mascota Salud" />
        </div>
        <span className={styles.logoName}>MascotaSalud</span>
      </div>
      <>
        <div className={styles.links} ref={mobileLinks}>
          {user
            ? (
              <>
            <NavLink onClick={handleMobileMenu} className={({ isActive }) => isActive ? styles.link__active : styles.link} to={ROUTES.HOME}>Home</NavLink>
            <NavLink onClick={handleMobileMenu} className={({ isActive }) => isActive ? styles.link__active : styles.link} to={ROUTES.EXPENSES}>Gastos</NavLink>
            </>)
            : (<>
            <NavLink onClick={handleMobileMenu} className={styles.link} to={ROUTES.LOGIN}>login</NavLink>
            <NavLink onClick={handleMobileMenu} className={styles.link} to={ROUTES.SIGNUP}>register</NavLink>
            </>
              )
          }
        </div>
        {user && (
        <div className={styles.user}>
          <p className={styles.userText}>Hola,
            <span>
              <Link className={styles.link} to={ROUTES.PROFILE}>{user && user.username}</Link>
            </span>
            <Link className={styles.link} onClick={handleLogout}><AiOutlinePoweroff /></Link>
          </p>
          <RoundedImage width={'60px'} height={'60px'} borderRadius='100%' src={fotoPathBuilder({ type: 'profile', foto: user.foto })} alt={user.username} />
        </div>)}
      </>

      <div className={styles.hamburger}>
        {isMenuOpen
          ? <AiOutlineClose onClick={handleMobileMenu} />
          : <AiOutlineMenu onClick={handleMobileMenu}/>
        }

      </div>
    </nav>
  )
}
export default Navbar
