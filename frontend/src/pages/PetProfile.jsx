import { Link, useParams } from 'react-router-dom'
import usePets from '../hooks/usePets'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import styles from './PetProfile.module.css'
import { getFormattedAge } from '../utils/getFormattedAge'
import { GiHealthNormal } from 'react-icons/gi'
import { ROUTES } from '../constants/routes'
import { createRoute } from '../utils/createRoute'
import NotFound from '../components/NotFound'
import { formatDateIntl } from '../utils/formatDateIntl'
import Loading from '../components/Loading'

const PetProfile = () => {
  const { pets, isLoading } = usePets()
  const { idPet } = useParams()

  if (isLoading) {
    return <Loading />
  }

  const selectedPet = pets.find((pet) => pet.ID === +idPet)

  if (!selectedPet) {
    return <NotFound />
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
            <p>{formatDateIntl(selectedPet.fecha_nac) || 'N/D'}</p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link className={styles.btn__history} to={createRoute(ROUTES.PET_HISTORY, selectedPet.ID)}><GiHealthNormal /> Ver historial salud</Link>
      </footer>
    </section>
  )
}

export default PetProfile
