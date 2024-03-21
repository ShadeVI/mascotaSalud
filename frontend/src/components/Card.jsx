import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import { ROUTES } from '../constants/routes'
import { createRoute } from '../utils/createRoute'

const Card = ({ pet }) => {
  return (
    <div className={styles.card}>
        <Link to={createRoute(ROUTES.SINGLE_PET, pet.ID)}>
        <div className={styles.photoContainer}>
          <img src={fotoPathBuilder({ type: 'animals', foto: pet.foto })} alt={`${pet.nombre} foto`} />
        </div>
        <div className={styles.description}>
          {pet.nombre}
        </div>
    </Link>
      </div>
  )
}
export default Card
