import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import { ROUTES } from '../constants/routes'

const Card = ({ pet }) => {
  return (
    <div className={styles.card}>
      <div className={styles.photoContainer}>
        <img src={fotoPathBuilder({ type: 'animals', foto: pet.foto })} alt={`${pet.nombre} foto`} />
      </div>
      <div className={styles.description}>
        <Link to={`${ROUTES.PETS}/${pet.ID}`}>{pet.nombre}</Link>
      </div>
    </div>
  )
}
export default Card
