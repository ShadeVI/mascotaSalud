import logo from '@assets/logo.png'
import bgImage from '@assets/gato-fondo-blanco.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '@hooks/useAuth'

const Login = () => {
  const [error, setError] = useState('')
  const navigator = useNavigate()
  const { setUser } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()))
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: formDataJSON
      })
      const data = await res.json()
      if (data?.message) {
        const res = await fetch(`http://localhost:3000/users/${data.result.username}`, {
          method: 'GET',
          credentials: 'include'
        })
        const dataUser = await res.json()
        console.log(dataUser)
        setUser(dataUser.result)
        navigator('/home')
      }
      if (data?.error) {
        setError(data.error)
      }
    } catch (err) {
      setError(err?.message || 'Error durante el login')
    }
  }

  return (
    <main className={`min-h-[100vh] flex justify-center items-center bg-[url('${bgImage}')] bg-cover`}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  bg-opacity-70 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto w-auto">
            <img src={logo} alt="Mascota Salud logo" className="h-14 mx-auto" />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Bienvenido!
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error && (
              <p>{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No tienes una cuenta? {' '}
            <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Registrate</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login
