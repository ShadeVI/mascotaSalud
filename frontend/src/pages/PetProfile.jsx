import { useParams } from 'react-router-dom'
import usePets from '../hooks/usePets'

const PetProfile = () => {
  const { pets } = usePets()
  const { idPet } = useParams()
  console.log(idPet)
  console.log(pets)
  return (
    <div>Pet</div>
  )
}
export default PetProfile
