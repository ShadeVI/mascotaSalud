import styles from './CardService.module.css'

const CardService = ({ title, text, icon }) => {
  return (
    <div className={styles.card}>
      <div><img className={styles.icon} src={icon} alt={`icon ${title}`} /></div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  )
}
export default CardService
