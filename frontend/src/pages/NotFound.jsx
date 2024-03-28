import Section from '../components/Section'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <Section>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Lo sentimos, esta pagina no existe</p>
    </Section>
  )
}

export default NotFound
