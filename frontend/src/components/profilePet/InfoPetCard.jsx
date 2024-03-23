import styles from './InfoPetCard.module.css'

const InfoPetCard = ({ title, info }) => {
  return (
    <div className={styles.info_pet_card}>
      <h4>{title}</h4>
      <p>{info || 'N/D'}</p>
    </div>
  )
}
export default InfoPetCard
