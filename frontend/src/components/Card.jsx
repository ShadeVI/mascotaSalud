import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import { ROUTES } from '../constants/routes'
import { createRoute } from '../utils/createRoute'

const Card = ({ pet }) => {
  return (
    <div className={styles.card}>
      <div className={styles.photoContainer}>
        <img src={fotoPathBuilder({ type: 'animals', foto: pet.foto })} alt={`${pet.nombre} foto`} />
      </div>
      <div className={styles.description}>
        <Link to={createRoute(ROUTES.SINGLE_PET, pet.ID)}>{pet.nombre}</Link>
      </div>
    </div>
  )
}
export default Card
