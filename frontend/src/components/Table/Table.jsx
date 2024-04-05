import styles from './Table.module.css'

const Table = ({ children }) => {
  return (
    <table className={styles.table}>{children}</table>
  )
}
export default Table
