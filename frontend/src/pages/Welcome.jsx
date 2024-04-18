import styles from './Welcome.module.css'
import imageWelcome from '../assets/welcome.jpg'

const Welcome = () => {
  // https://unsplash.com/es/fotos/mujer-y-gato-se-dan-la-mano-N_G2Sqdy9QY

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.textContainer}>
          <h1>Bienvenido a Mascota Salud</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt animi nobis quis temporibus, adipisci maiores eos praesentium culpa! Voluptates amet a laborum iure officia ad odio, illo rerum voluptatibus vitae.</p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.welcomeImg} src={imageWelcome} alt="gato y persona" />
        </div>
      </header>
      <section>
        CARDS
      </section>
    </main>
  )
}
export default Welcome
