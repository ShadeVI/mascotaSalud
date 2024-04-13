import { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Loading from '../components/Loading'
import Section from '../components/Section'
import Actions from '../components/Table/Actions'
import Table from '../components/Table/Table'
import { ROUTES } from '../constants/routes'
import useExpenses from '../hooks/useExpenses'
import usePets from '../hooks/usePets'
import { formatDateIntl } from '../utils/formatDateIntl'
import Modal from '../components/Modal'
import FormContainer from '../components/form/FormContainer'
import Row from '../components/form/Row'
import Label from '../components/form/Label'
import Input from '../components/form/Input'
import Button from '../components/Button'
import { formatDateYYYYmmdd } from '../utils/formatDate'
import useAuth from '../hooks/useAuth'
import { createExpense, deleteExpense, updateExpense } from '../services/expenses.services'
import { monthsMapper } from '../utils/monthsMapper'

const initialFormState = {
  ID: '',
  descripcion: '',
  fecha: '',
  valor: '',
  IDmascota: '',
  UUIDusuario: ''
}

const Expenses = () => {
  const { user } = useAuth()
  const { pets } = usePets()
  const { expenses, isLoading, setExpenses } = useExpenses()
  const [filteredExpenses, setFilteredExpenses] = useState([...expenses])
  const [selectedFilterID, setSelectedFilterID] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [formEntries, setFormEntries] = useState(initialFormState)
  const [petOnEdit, setPetOnEdit] = useState(null)

  const handleChangeFilter = (e) => {
    const getFilteredValue = isNaN(e.target.value) ? 'all' : Number(e.target.value)
    setSelectedFilterID(getFilteredValue)
  }

  const handleFormEntries = (e) => {
    setFormEntries((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleShowModal = () => {
    setFormEntries(initialFormState)
    setShowModal(prev => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    for (const key in formEntries) {
      formData.append(key, formEntries[key])
    }

    const { result, error } = isEdit
      ? await updateExpense({ body: JSON.stringify(Object.fromEntries(formData)), jwt: user.jwt })
      : await createExpense({ body: JSON.stringify(Object.fromEntries(formData)), jwt: user.jwt })

    if (error) {
      console.log(error)
      return
    }

    if (result) {
      setExpenses(prev => {
        let oldExpenses = [...prev]
        if (isEdit) {
          oldExpenses = [...prev].filter((hist) => hist.ID !== result.ID)
        }
        return [...oldExpenses, result].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      })
      setShowModal(false)
      setFormEntries(initialFormState)
    }
  }

  const handleEdit = async (ID, petId) => {
    setPetOnEdit(pets.filter(pet => pet.ID === petId)[0])
    setIsEdit(true)
    setShowModal(true)
    const { descripcion, valor, fecha, ID_mascota: IDmascota, UUID_usuario: UUIDusuario } = expenses.filter(expense => expense.ID === ID)[0]
    setFormEntries({
      ID,
      descripcion,
      fecha: formatDateYYYYmmdd(fecha),
      valor,
      IDmascota,
      UUIDusuario
    })
  }

  const handleDelete = async (ID) => {
    if (!window.confirm('¿Está seguro de eliminar este registro?')) return
    try {
      const { result, error } = await deleteExpense({ expenseID: ID, jwt: user.jwt })
      if (error) {
        console.log(error)
        return
      }
      if (result) {
        setExpenses(prev => prev.filter(expense => expense.ID !== ID).sort((a, b) => new Date(b.fecha) - new Date(a.fecha)))
      }
    } catch (err) {
      alert('Error al intentar eliminar el historial')
    }
  }

  useEffect(() => {
    if (selectedFilterID === 'all') {
      return setFilteredExpenses([...expenses])
    }
    const expFilt = expenses.filter(({ ID_mascota: IDmascota }) => {
      return IDmascota === selectedFilterID
    })
    setFilteredExpenses(expFilt)
  }, [selectedFilterID, expenses])

  if (isLoading) {
    return <Loading />
  }
  return (
    <Section>
      <BackButton route={ROUTES.HOME}/>
      <div style={{ width: 'fit-content', height: 'fit-content', padding: '20px', border: '1px solid black', margin: '0 auto' }}>Gastos de {monthsMapper(new Date().getMonth())}: {expenses.filter((exp) => new Date(exp.fecha).getMonth() === new Date().getMonth()).reduce((prev, curr) => {
        return prev + curr.valor
      }, 0)} €</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
        <div>
          <label htmlFor='filter-expenses'>Filtrar por: </label>
          <select id='filter-expenses' name='filterExpense' onChange={(e) => handleChangeFilter(e)}>
            <option value="all">Todos</option>
              {
                pets.map(({ ID, nombre }) => {
                  return (<option key={ID} value={ID}>{nombre}</option>)
                })
              }
          </select>
        </div>
        <div>
          <Button type='button' onClick={handleShowModal}>Añadir gasto</Button>
        </div>
      </div>
      {showModal && (
        <Modal handleClose={handleShowModal}>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              {petOnEdit && <h3 style={{ marginBottom: '15px' }}>Estás modificando el registro de {petOnEdit?.nombre}</h3>}
              <Row>
                <Label text='fecha' htmlFor='fecha' />
                <Input type='date' id='fecha' name='fecha' value={formEntries?.fecha} onChange={handleFormEntries} />
              </Row>
              <Row>
                <Label text='descripcion' htmlFor='descripcion' />
                <Input type='text' id='descripcion' name='descripcion' value={formEntries?.descripcion} onChange={handleFormEntries} />
              </Row>
              <Row>
                <Label text='valor' htmlFor='valor' />
                <Input type='number' step='0.01' min='0' id='valor' name='valor' value={formEntries?.valor} onChange={handleFormEntries} />
              </Row>
              <Button type='submit'>Enviar</Button>
            </form>
          </FormContainer>
        </Modal>)
      }
      <Table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Mascota</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            filteredExpenses.length > 0
              ? filteredExpenses.map(({ ID, descripcion, fecha, valor, ID_mascota: IDmascota }) => {
                const nombre = pets?.find((pet) => pet.ID === IDmascota)?.nombre || null
                return (
                  <tr key={ID}>
                    <td>{descripcion}</td>
                    <td>{Number(valor)?.toFixed(2)} €</td>
                    <td>{formatDateIntl(fecha)}</td>
                    <td>{nombre}</td>
                    <td>
                      <Actions ID={ID} handleEdit={() => handleEdit(ID, IDmascota)} handleDelete={() => handleDelete(ID)}/>
                    </td>
                  </tr>
                )
              })
              : <tr><td colSpan={5}>No hay datos</td></tr>
          }
        </tbody>
      </Table>
    </Section>
  )
}
export default Expenses
