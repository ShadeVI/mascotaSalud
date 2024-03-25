import styles from './Row.module.css'

const Row = ({ inline, children }) => {
  return (
    <div className={inline ? styles.row__inline : styles.row}>
      {children}
    </div>
  )
}
export default Row
