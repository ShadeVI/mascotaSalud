import styles from './ButtonSquare.module.css'

const ButtonSquare = ({ text, handleClick, ...props }) => {
  return (
    <div className={styles.container}>
      <button onClick={handleClick} {...props}>{text}</button>
    </div>
  )
}
export default ButtonSquare
