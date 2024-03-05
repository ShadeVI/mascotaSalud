import styles from './ButtonSquare.module.css'

const ButtonSquare = ({ type }) => {
  const text = type === 'add' ? '+' : ''
  return (
    <div className={styles.container}>
      <button>{text}</button>
    </div>
  )
}
export default ButtonSquare
