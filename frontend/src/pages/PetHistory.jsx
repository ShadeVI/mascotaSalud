import { useEffect, useState } from 'react'
import styles from './PetHistory.module.css'
import { getPetHistory } from '../services/pets.services'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import { MdEdit, MdDelete } from 'react-icons/md'
import { formatDateIntl } from '../utils/formatDateIntl'
import NotFound from '../components/NotFound'

import RoundedImage from '../components/RoundedImage'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { ROUTES } from '../constants/routes'
import { createRoute } from '../utils/createRoute'
import LineChart from '../components/LineChart'
import BackButton from '../components/BackButton'
import SectionPet from '../components/Section'

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
    <SectionPet>
      <BackButton route={createRoute(ROUTES.SINGLE_PET, selectedPet.ID)}/>
      <header className={styles.header}>
        <h1 className={styles.title}>Historial de {selectedPet?.nombre}</h1>
        <RoundedImage src={fotoPathBuilder({ type: 'animals', foto: selectedPet?.foto })} alt={selectedPet.nombre} width='150px' height='150px' borderRadius='8px' />
      </header>

      {
        history.length > 1
          ? (<LineChart title='Variación del peso' labelsX={history.map((row) => formatDateIntl(row.fecha))} datasets={[
              {
                label: 'peso (en gramos)',
                data: history.map(row => row.peso),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
              }
            ]}
          />)
          : (<div className={styles.info__noDatos}>
              <h3 >No hay suficientes datos para mostrar un gráfico</h3>
              <p>Añade mas datos haciendo click <Link to={'home'}>aquí</Link></p>
            </div>)
      }

      <div>
        AÑADIR NUEVOS DATOS
      </div>

      <table className={styles.table}>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Peso <small>(en gramos)</small></th>
                <th>Antiparasitario</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          {
            history.map(({ ID, peso, antiparasitario, fecha }) => {
              return (
                <tr key={ID}>
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
    </SectionPet>
  )
}
export default PetHistory
