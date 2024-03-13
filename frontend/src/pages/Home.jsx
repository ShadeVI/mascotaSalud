import styles from './Home.module.css'
import Grid from '../components/grid/Grid'
import GridSquare from '../components/grid/GridSquare'
import Card from '../components/Card'
import ButtonSquare from '../components/ButtonSquare'
import usePets from '../hooks/usePets'
import Modal from '../components/Modal'

const Home = () => {
  const { pets } = usePets()

  const handleAddPet = () => {
    console.log('click')
  }

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
                <ButtonSquare text='+' />
              </GridSquare>
            </Grid>
            )
          : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyItems: 'center',
              alignItems: 'center',
              gap: '20px',
              textAlign: 'center'
            }}>
              <h2 className={styles.info}>Todavía no tienes registrada ninguna mascota</h2>
              <p>Quieres añadir tu primera mascota?</p>
              <ButtonSquare text='+' handleClick={handleAddPet} />
            </div>
            )
      }
    {<Modal />}
    </section>
  )
}

export default Home
