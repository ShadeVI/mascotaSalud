import styles from './ButtonSquare.module.css'

const ButtonSquare = ({ text, handleClick }) => {
  return (
    <div className={styles.container}>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}
export default ButtonSquare
