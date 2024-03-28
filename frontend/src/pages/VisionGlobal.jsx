import { useEffect, useState } from 'react'
import LineChart from '../components/LineChart'
import usePets from '../hooks/usePets'
import { getPetHistory } from '../services/pets.services'
import useAuth from '../hooks/useAuth'

const VisionGlobal = () => {
  const { user } = useAuth()
  const { pets } = usePets()
  const [datasets, setDataSets] = useState()

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data = [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random()),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random()),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]

  useEffect(() => {
    if (pets) {
      Promise.all(pets?.map(pet => getPetHistory({ idPet: pet.ID, jwt: user.jwt })))
        .then((res) => console.log(res))
    }
  }, [pets])

  return (
    <div>
      <LineChart labelsX={labels} title={'overview'}
        datasets={data}
/>
    </div>
  )
}
export default VisionGlobal
