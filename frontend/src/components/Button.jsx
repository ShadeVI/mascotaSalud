import styles from './Button.module.css'

const Button = ({ children, type, disabled }) => {
  return (
    <button className={styles.button} type={type} disabled={disabled} >{children}</button>
  )
}
export default Button
