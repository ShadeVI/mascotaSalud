import styles from './Button.module.css'

const Button = ({ children, type, disabled, ...props }) => {
  return (
    <button className={styles.button} type={type} disabled={disabled} {...props} >{children}</button>
  )
}
export default Button
