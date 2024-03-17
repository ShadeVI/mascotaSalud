import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import usePets from '../hooks/usePets'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import styles from './PetProfile.module.css'
import { getFormattedAge } from '../utils/getFormattedAge'

const PetProfile = () => {
  const { pets } = usePets()
  const { idPet } = useParams()
  const selectedPet = pets.find((pet) => pet.ID === +idPet)

  if (!selectedPet) {
    return <Loading />
  }

  return (
    <section className={styles.section}>
      <div className={styles.image__container}>
        <img src={fotoPathBuilder({ type: 'animals', foto: selectedPet?.foto })} />
      </div>
      <header className={styles.header}>
        <h1 className={styles.name}>{selectedPet.nombre}</h1>
        <h3 className={styles.age}>Edad: {getFormattedAge(selectedPet.fecha_nac)}</h3>
      </header>
      <main>
        CONTENIDO
      </main>
    </section>
  )
}

export default PetProfile
