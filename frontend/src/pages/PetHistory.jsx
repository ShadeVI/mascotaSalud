import { useEffect, useState } from 'react'
import styles from './PetHistory.module.css'
import { getPetHistory } from '../services/pets.services'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import { MdEdit, MdDelete } from 'react-icons/md'
import { formatDateIntl } from '../utils/formatDateIntl'
import NotFound from '../components/NotFound'
import { useParams } from 'react-router-dom'
import RoundedImage from '../components/RoundedImage'
import { fotoPathBuilder } from '../utils/fotoPathBuilder'
import { ROUTES } from '../constants/routes'
import { createRoute } from '../utils/createRoute'
import LineChart from '../components/LineChart'
import BackButton from '../components/BackButton'
import SectionPet from '../components/Section'
import Button from '../components/Button'
import FormContainer from '../components/form/FormContainer'
import Row from '../components/form/Row'
import Label from '../components/form/Label'
import Input from '../components/form/Input'
import Modal from '../components/Modal'

const PetHistory = () => {
  const { pets } = usePets()
  const { user } = useAuth()
  const { idPet } = useParams()
  const [history, setHistory] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(prev => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
  }

  useEffect(() => {
    const selectedPet = pets.find((pet) => pet.ID === +idPet)
    setSelectedPet(selectedPet)
  }, [pets])

  useEffect(() => {
    if (selectedPet) {
      getPetHistory({ idPet: selectedPet?.ID, jwt: user.jwt })
        .then((data) => setHistory(data))
    }
  }, [selectedPet])

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
            </div>)
      }

      <div className={styles.buttonWrapper}>
        <Button type='button' onClick={handleShowModal}>Añadir datos</Button>
      </div>

      {showModal && (
        <Modal handleClose={handleShowModal}>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <Row>
                <Label text='fecha' htmlFor='fecha' />
                <Input type='date' id='fecha' />
              </Row>
              <Row>
                <Label text='peso' htmlFor='peso' />
                <Input type='number' id='peso' />
              </Row>
              <Row>
                <Label text='antiparasitario' htmlFor='antiparasitario' />
                <Input type='checkbox' id='antiparasitario' />
              </Row>
              <Button type='submit'>Enviar</Button>
            </form>
          </FormContainer>
        </Modal>)
      }

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
