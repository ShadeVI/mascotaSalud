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

const Expenses = () => {
  const { pets } = usePets()
  const { expenses, isLoading } = useExpenses()
  const [filteredExpenses, setFilteredExpenses] = useState([...expenses])
  const [selectedFilterID, setSelectedFilterID] = useState('all')

  const handleChangeFilter = (e) => {
    const getFilteredValue = isNaN(e.target.value) ? 'all' : Number(e.target.value)
    setSelectedFilterID(getFilteredValue)
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
                    <td>{Number(valor)?.toPrecision(4)} €</td>
                    <td>{formatDateIntl(fecha)}</td>
                    <td>{nombre}</td>
                    <td>
                      <Actions ID={ID} handleEdit={() => null} handleDelete={() => null}/>
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
