import styles from './GridSquare.module.css'

const GridSquare = ({ children }) => {
  return (<div className={styles.square}>
    {children}
  </div>
  )
}
export default GridSquare
