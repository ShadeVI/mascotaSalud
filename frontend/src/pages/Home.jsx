import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import styles from './Home.module.css'
import Grid from '../components/grid/Grid'
import GridSquare from '../components/grid/GridSquare'
import Card from '../components/Card'
import ButtonSquare from '../components/ButtonSquare'

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
    <section className={styles.section}>
      {
        pets.length > 0
          ? (
            <Grid>
              {pets.map(pet => {
                return (
                  <GridSquare key={pet.ID}>
                    <Card pet={pet} />
                  </GridSquare>
                )
              })}
              <GridSquare key='Add'>
                <ButtonSquare type='add' />
              </GridSquare>
            </Grid>
            )
          : (
            <p className={styles.info}>No hay mascotas</p>
            )
      }
    </section>
  )
}

export default Home
