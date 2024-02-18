import Container from '../components/Container'

const Welcome = () => {
  return (

      <Container>
        <div className='h-full flex flex-col justify-center items-center gap-20'>
          <h1 className="font-welcome text-[60px] sm:text-[90px] md:text-[120px] text-center text-balance">Mascota Salud</h1>
          <h2 className='text-sm sm:text-lg md:text-2xl'>Tu aplicación para cuidar con <span className='font-bold'>❤️</span> tus mascotas</h2>
        </div>
      </Container>
  )
}
export default Welcome
