import { NavLink } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

const applyIsActiveStatus = ({ isActive }) => isActive ? 'font-bold' : ''

const Navbar = () => {
  const { user } = useAuth()
  return (
    <nav className='h-20 w-screen px-10 text-white bg-transparent fixed flex justify-between items-center'>
      {user
        ? (<>
          <div className='flex ml-5 gap-5'>
            <NavLink to={'/'} className={applyIsActiveStatus} >Home</NavLink>
            <NavLink to={'/mascotas'} className={applyIsActiveStatus} >Mascotas</NavLink>
            <NavLink to={'/gastos'} className={applyIsActiveStatus} >Gastos</NavLink>
          </div>
          <div>
            PROFILE
          </div>
        </>)
        : (
        <>
          <div className='flex ml-5 gap-5'>
            <NavLink to={'/login'} className={applyIsActiveStatus} >Login</NavLink>
            <NavLink to={'/signup'} className={applyIsActiveStatus} >Register</NavLink>
          </div>
        </>
          )
      }
    </nav>
  )
}

export default Navbar
