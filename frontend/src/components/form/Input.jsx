import styles from './Input.module.css'

const Input = ({ type, value, onChange, ...props }) => {
  return (
    <input type={type} className={styles.input} value={value} onChange={onChange} {...props} />
  )
}
export default Input
