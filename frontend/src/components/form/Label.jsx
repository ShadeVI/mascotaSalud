import styles from './Label.module.css'

const Label = ({ text, htmlFor, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label} {...props}>{text}</label>
  )
}
export default Label
