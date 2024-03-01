import styles from './Input.module.css'

const Input = ({ type, value, onChange }) => {
  return (
    <input type={type} className={styles.input} value={value} onChange={onChange} />
  )
}
export default Input
