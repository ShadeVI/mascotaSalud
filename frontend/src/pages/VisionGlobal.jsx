import { useEffect, useState } from 'react'
import LineChart from '../components/LineChart'
import usePets from '../hooks/usePets'
import { getPetHistory } from '../services/pets.services'
import useAuth from '../hooks/useAuth'

const VisionGlobal = () => {
  const { user } = useAuth()
  const { pets } = usePets()
  const [datasets, setDataSets] = useState([])
  const [labelsX, setLabelsX] = useState([])

  useEffect(() => {
    if (pets) {
      Promise.all(
        pets?.map(async pet => {
          const arrHistory = await getPetHistory({ idPet: pet.ID, jwt: user.jwt })
          return arrHistory
        })
      )
        .then((res) => {
          const flatted = res.flat()
          const labels = Array.from(new Set(flatted.map(
            pet => new Date(pet.fecha).getMonth() + 1
          ).sort((a, b) => a - b)))

          const groups = flatted.reduce((acc, pet) => {
            if (!acc[pet.nombre]) {
              acc[pet.nombre] = []
            }
            acc[pet.nombre].push(pet.peso)
            return acc
          }, {})

          // Luego, construimos el array "data" usando la información agrupada
          const data = Object.entries(groups).map(([nombre, weights]) => {
            const randomRGB = `${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}`
            return {
              label: nombre,
              data: weights,
              borderColor: `rgb(${randomRGB})`,
              backgroundColor: `rgba(${randomRGB}, 0.5)`
            }
          })
          setLabelsX(labels)
          setDataSets(data)
        })
    }
  }, [pets])

  return (
    <div>
      <LineChart labelsX={labelsX} title={'overview'}
        datasets={datasets}
/>
    </div>
  )
}
export default VisionGlobal
