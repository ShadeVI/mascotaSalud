import { NavLink } from 'react-router-dom'

const applyIsActiveStatus = ({ isActive }) => isActive ? 'underline text-green-700 uppercase' : 'uppercase'

const Navbar = () => {
  return (
    <nav className='h-20 bg-blue-100 flex justify-between items-center'>
      <div className='flex ml-5 gap-2'>
        <NavLink to={'/'} className={applyIsActiveStatus} >Home</NavLink>
        <NavLink to={'/mascotas'} className={applyIsActiveStatus} >Mascotas</NavLink>
        <NavLink to={'/gastos'} className={applyIsActiveStatus} >Gastos</NavLink>
      </div>
      <div>
        PROFILE
      </div>
    </nav>
  )
}

export default Navbar
