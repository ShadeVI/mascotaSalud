import { useEffect, useState } from 'react'
import styles from './PetHistory.module.css'
import { getPetHistory } from '../services/pets.services'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import { MdEdit, MdDelete, MdArrowBack } from 'react-icons/md'
import { formatDateIntl } from '../utils/formatDateIntl'
import NotFound from '../components/NotFound'

import RoundedImage from '../components/RoundedImage'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { ROUTES } from '../constants/routes'
import { createRoute } from '../utils/createRoute'
import LineChart from '../components/LineChart'

const PetHistory = () => {
  const { pets } = usePets()
  const { user } = useAuth()
  const { idPet } = useParams()
  const [history, setHistory] = useState([])

  const selectedPet = pets.find((pet) => pet.ID === +idPet)

  useEffect(() => {
    getPetHistory({ idPet, jwt: user.jwt })
      .then((data) => setHistory(data))
  }, [])

  if (!selectedPet) {
    return <NotFound />
  }

  return (
    <section className={styles.section}>
      <Link to={createRoute(ROUTES.SINGLE_PET, selectedPet.ID)}><MdArrowBack fontSize={'2rem'} /></Link>
      <header className={styles.header}>
        <h1 className={styles.title}>Historial de {selectedPet?.nombre}</h1>
        <RoundedImage src={fotoPathBuilder({ type: 'animals', foto: selectedPet?.foto })} alt={selectedPet.nombre} width='150px' height='150px' borderRadius='8px' />
      </header>

      {history && (
          <LineChart title='Variación del peso' labelsX={history.map((row) => formatDateIntl(row.fecha))} datasets={[
            {
              label: 'peso (en gramos)',
              data: history.map(row => row.peso),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
          ]} />
      )}

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
