import { useParams } from 'react-router-dom'
import usePets from '../hooks/usePets'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import styles from './PetProfile.module.css'

const PetProfile = () => {
  const { pets } = usePets()
  const { idPet } = useParams()
  const selectedPet = pets.find((pet) => pet.ID === +idPet)
  return (
    <section>
      <div>
        <div>
          <img src={fotoPathBuilder({ type: 'animals', foto: selectedPet?.foto })} />
        </div>
      </div>
    </section>
  )
}

export default PetProfile
