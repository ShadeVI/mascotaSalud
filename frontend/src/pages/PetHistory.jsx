import { useEffect, useState } from 'react'
import styles from './PetHistory.module.css'
import { getPetHistory } from '../services/pets.services'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import { MdEdit, MdDelete } from 'react-icons/md'
import { formatDateIntl } from '../utils/formatDateIntl'

const PetHistory = () => {
  const [history, setHistory] = useState([])

  const { pets } = usePets()
  const { user } = useAuth()
  const { idPet } = useParams()

  const selectedPet = pets.find((pet) => pet.ID === +idPet)

  useEffect(() => {
    getPetHistory({ idPet, jwt: user.jwt })
      .then((data) => setHistory(data))
  }, [])

  return (
    <section>
      <h1 className={styles.title}>Historial de {selectedPet?.nombre}</h1>
      <table className={styles.table}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Peso <small>(en gramos)</small></th>
                <th>Antiparasitario</th>
            </tr>
        </thead>
        <tbody>
          {
            history.map(({ ID, peso, antiparasitario, fecha }) => {
              return (
            <tr key={ID}>
                <td>{ID}</td>
                <td>{formatDateIntl(fecha)}</td>
                <td>{peso}</td>
                <td>{antiparasitario ? 'SI' : 'NO'}</td>
                <td>
                  <div className={styles.actions}>
                    <div><MdEdit /></div>
                    <div><MdDelete /></div>
                  </div>
                </td>
            </tr>

              )
            })
          }
        </tbody>
      </table>
    </section>
  )
}
export default PetHistory
