import styles from './SectionVertical.module.css'

const SectionVertical = ({ children }) => {
  return (
    <section className={styles.section}>{children}</section>
  )
}
export default SectionVertical
