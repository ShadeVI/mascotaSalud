import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import usePets from '../hooks/usePets'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import styles from './PetProfile.module.css'
import { getFormattedAge } from '../utils/getFormattedAge'
import { GiHealthNormal } from 'react-icons/gi'

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
        <h3 className={styles.age}>Edad: {getFormattedAge(selectedPet.fecha_nac) || 'N/D'}</h3>
      </header>
      <main>
        <div className={styles.main__content}>
          <div className={styles.main__content_elem}>
            <h4>Especie</h4>
            <p>{selectedPet.tipo}</p>
          </div>
          <div className={styles.main__content_elem}>
            <h4>Numero chip</h4>
            <p>{selectedPet.n_chip || 'N/D'}</p>
          </div>
          <div className={styles.main__content_elem}>
            <h4>Fecha de nacimiento</h4>
            <p>{new Date(selectedPet.fecha_nac).toLocaleDateString() || 'N/D'}</p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div>
          <GiHealthNormal />
          <Link>Ver historial medico</Link>
        </div>
      </footer>
    </section>
  )
}

export default PetProfile
