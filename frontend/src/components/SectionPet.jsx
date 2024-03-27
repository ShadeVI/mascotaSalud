import styles from './SectionPet.module.css'

const SectionPet = ({ children }) => {
  return (
    <section className={styles.section}>{children}</section>
  )
}
export default SectionPet
