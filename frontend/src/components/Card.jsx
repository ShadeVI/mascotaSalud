import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ pet }) => {
  return (
    <div className={styles.card}>
      <div className={styles.photoContainer}>
        <img src={fotoPathBuilder({ type: 'animals', foto: pet.url_foto })} alt={`${pet.nombre} foto`} />
      </div>
      <div className={styles.description}>
        <Link to={`mascotas/${pet.ID}`}>{pet.nombre}</Link>
      </div>
    </div>
  )
}
export default Card
