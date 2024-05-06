import styles from './Welcome.module.css'
import imageWelcome from '../assets/welcome.jpg'
import CardService from '../components/CardService'
import { services } from '../data/welcomeCardsInfo'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

const Welcome = () => {
  // https://unsplash.com/es/fotos/mujer-y-gato-se-dan-la-mano-N_G2Sqdy9QY
  const { user } = useAuth()
  const navigator = useNavigate()
  if (user) {
    navigator(ROUTES.HOME)
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.textContainer}>
          <h1>Bienvenido a Mascota Salud</h1>
          <p>Optimiza el cuidado de tu mascota con esta nueva aplicación web. Registra datos esenciales, supervisa su salud y gestiona tus gastos de manera eficiente. Simplifica tu vida como dueño de mascotas con nosotros. ¡Únete hoy mismo!</p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.welcomeImg} src={imageWelcome} alt="gato y persona" />
        </div>
      </header>
      <section>
        <h2 className={styles.services__title}>Servicios ofrecidos</h2>
        <div className={styles.services__cards}>
          {services.map((service, i) => {
            const { title, text, icon } = service
            return <CardService key={i} title={title} text={text} icon={icon} />
          })}
        </div>
      </section>
    </main>
  )
}
export default Welcome
