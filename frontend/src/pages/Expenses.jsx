import Loading from '../components/Loading'
import Section from '../components/Section'
import Table from '../components/Table/Table'
import useExpenses from '../hooks/useExpenses'
import usePets from '../hooks/usePets'
import { formatDateIntl } from '../utils/formatDateIntl'

const Expenses = () => {
  const { pets } = usePets()
  const { expenses, isLoading } = useExpenses()

  if (isLoading) {
    return <Loading />
  }
  return (
    <Section>
      <div>
        <label>Filtrar por: </label>
        <select>
          {
            pets.map(({ ID, nombre }) => {
              return (<option key={ID}>{nombre}</option>)
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
              const { nombre } = pets.find((pet) => pet.ID === IDmascota)
              return (<tr key={ID}>
                <td>{descripcion}</td>
                <td>{valor}</td>
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
