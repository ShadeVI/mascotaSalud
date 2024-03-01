import styles from './Label.module.css'

const Label = ({ text, idInput }) => {
  return (
    <label htmlFor={idInput} className={styles.label}>{text}</label>
  )
}
export default Label
