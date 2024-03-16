import styles from './Label.module.css'

const Label = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>{text}</label>
  )
}
export default Label
