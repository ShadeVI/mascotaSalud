import { Link, useNavigate, useParams } from 'react-router-dom'
import usePets from '../hooks/usePets'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import styles from './PetProfile.module.css'
import { getFormattedAge } from '../utils/getFormattedAge'
import { GiHealthNormal } from 'react-icons/gi'
import { ROUTES } from '../constants/routes'
import { createRoute } from '../utils/createRoute'
import NotFound from '../components/NotFound'
import { formatDateIntl } from '../utils/formatDateIntl'
import Loading from '../components/Loading'
import InfoPetCard from '../components/profilePet/InfoPetCard'
import { convertBoolAnswer, convertGender } from '../utils/petProfileUtils'
import SectionPet from '../components/Section'
import { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { deletePet } from '../services/pets.services'
import useAuth from '../hooks/useAuth'

const PetProfile = () => {
  const { user } = useAuth()
  const { pets, isLoading, deletePetCtx } = usePets()
  const { idPet } = useParams()
  const navigator = useNavigate()
  const [selectedPet, setSelectedPet] = useState(null)

  const handleDelete = async () => {
    const { result } = await deletePet({ idPet, jwt: user.jwt })
    if (result) {
      deletePetCtx(selectedPet.ID)
      navigator(ROUTES.HOME)
    }
  }

  useEffect(() => {
    const selectedPet = pets.find((pet) => pet.ID === +idPet)
    setSelectedPet(selectedPet)
  }, [pets])

  if (isLoading) {
    return <Loading />
  }

  if (!selectedPet && !isLoading) {
    return <NotFound />
  }

  return (
    <SectionPet>
      <BackButton route={createRoute(ROUTES.HOME)}/>
      <button className={styles.btn__delete} onClick={handleDelete} >eliminar</button>
      <div className={styles.image__container}>
        <img src={fotoPathBuilder({ type: 'animals', foto: selectedPet?.foto })} />
      </div>
      <header className={styles.header}>
        <h1 className={styles.name}>{selectedPet?.nombre}</h1>
        <h3 className={styles.age}>Edad: {getFormattedAge(selectedPet?.fecha_nac) || 'N/D'}</h3>
      </header>
      <main className={styles.main__content}>

          <InfoPetCard title='Genero' info={convertGender(selectedPet?.genero)} />
          <InfoPetCard title='Especie' info={selectedPet?.tipo} />
          <InfoPetCard title='Raza' info={selectedPet?.raza} />
          <InfoPetCard title='Numero microchip' info={selectedPet?.n_chip} />
          <InfoPetCard title='Vacuna básica' info={convertBoolAnswer(selectedPet?.vacuna_basica)} />
          <InfoPetCard title='Fecha de nacimiento' info={formatDateIntl(selectedPet?.fecha_nac)} />

      </main>
      <footer className={styles.footer}>
        <Link className={styles.btn} to={createRoute(ROUTES.UPDATE_PET, selectedPet.ID)} >Actualizar datos</Link>
        <Link className={styles.btn} to={createRoute(ROUTES.PET_HISTORY, selectedPet.ID)}>
          <GiHealthNormal />Historial salud
        </Link>
      </footer>
    </SectionPet>
  )
}

export default PetProfile
