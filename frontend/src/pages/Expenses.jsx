import BackButton from '../components/BackButton'
import Loading from '../components/Loading'
import Section from '../components/Section'
import Table from '../components/Table/Table'
import { ROUTES } from '../constants/routes'
import useExpenses from '../hooks/useExpenses'
import usePets from '../hooks/usePets'
import { formatDateIntl } from '../utils/formatDateIntl'

const Expenses = () => {
  const { pets } = usePets()
  const { expenses, isLoading } = useExpenses()

  const handleChangeFilter = (e) => {
    console.log(e.target)
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <Section>
      <BackButton route={ROUTES.HOME}/>
      <div>
        <label htmlFor='filter-expenses'>Filtrar por: </label>
        <select id='filter-expense' name='filterExpense' onChange={(e) => handleChangeFilter(e)}>
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
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(({ ID, descripcion, fecha, valor, ID_mascota: IDmascota }) => {
              const nombre = pets?.find((pet) => pet.ID === IDmascota)?.nombre || null
              return (<tr key={ID}>
                <td>{descripcion}</td>
                <td>{Number(valor)?.toPrecision(4)} €</td>
                <td>{formatDateIntl(fecha)}</td>
                <td>{nombre}</td>
              </tr>)
            })
          }

        </tbody>
      </Table>
    </Section>
  )
}
export default Expenses
