import styles from './Home.module.css'
import Grid from '../components/grid/Grid'
import GridSquare from '../components/grid/GridSquare'
import Card from '../components/Card'
import ButtonSquare from '../components/ButtonSquare'
import usePets from '../hooks/usePets'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Loading from '../components/Loading'
import SectionVertical from '../components/SectionVertical'
import Section from '../components/Section'

const Home = () => {
  const navigator = useNavigate()
  const { pets, isLoading } = usePets()

  const handleAddPet = () => {
    navigator(ROUTES.NEW_PET)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {
        pets.length > 0
          ? (
            <Section>
              <Grid>
                {pets.map(pet => {
                  return (
                    <GridSquare key={pet.ID}>
                      <Card pet={pet} />
                    </GridSquare>
                  )
                })}
                <GridSquare key='Add'>
                  <ButtonSquare text='+' handleClick={handleAddPet} />
                </GridSquare>
              </Grid>
            </Section>
            )
          : (
            <SectionVertical>
              <h2 className={styles.info}>Todavía no tienes registrada ninguna mascota</h2>
              <p>Quieres añadir tu primera mascota?</p>
              <ButtonSquare text='+' handleClick={handleAddPet} />
            </SectionVertical>
            )
      }
    </>
  )
}

export default Home
