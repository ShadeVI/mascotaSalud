import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

const Home = () => {
  const { user } = useAuth()
  const [pets, setPets] = useState([])

  useEffect(() => {
    const fetchPets = async () => {
      const res = await fetch('http://localhost:3000/pets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.jwt}`
        }
      })
      const data = await res.json()
      if (data?.result.data) {
        setPets(data.result.data)
      }
    }
    fetchPets()
  }, [])

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(100px, auto)', gap: '50px' }}>
        {
          pets.length > 0
            ? (
                pets.map(pet => (
              <div key={pet.ID}>
                Nombre: {pet.nombre}
                </div>
                ))
              )
            : (
            <p>No hay mascotas</p>
              )
        }
      </div>
    </div>
  )
}

export default Home
