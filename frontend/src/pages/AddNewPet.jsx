import { useState } from 'react'
import Button from '../components/Button'
import styles from './AddNewPet.module.css'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

const optionsAnimalTypes = [
  {
    value: '',
    displayText: 'Seleccione una opción'
  },
  {
    value: 'gato',
    displayText: 'Gato'
  },
  {
    value: 'perro',
    displayText: 'Perro'
  },
  {
    value: 'hamster',
    displayText: 'Hamster'
  },
  {
    value: 'loro',
    displayText: 'Loro'
  },
  {
    value: 'otro',
    displayText: 'Otro'
  }
]

const initialFormState = {
  nombre: '',
  n_chip: '',
  fecha_nac: '',
  tipo: optionsAnimalTypes[0].value,
  imagePet: null
}

const AddNewPet = () => {
  const { user } = useAuth()
  const { addNewPetCtx } = usePets()
  const navigator = useNavigate()
  const [formEntries, setFormEntries] = useState(initialFormState)

  const handleFormEntries = (e) => {
    setFormEntries((prev) => {
      if (e.target.type === 'file') {
        return {
          ...prev,
          [e.target.name]: e.target.files[0]
        }
      }
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formEntries.nombre) {
      // TODO: Set error
      return
    }

    try {
      const formData = new FormData()
      for (const key in formEntries) {
        formData.append(key, formEntries[key])
      }

      const res = await fetch('http://localhost:3000/pets/new-pet', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`
        },
        body: formData
      })
      const data = await res.json()
      if (data?.error) {
        console.log(data.error)
        return
      }
      if (data?.result) {
        addNewPetCtx(data.result.data)
        navigator(ROUTES.HOME)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className={styles.section}>
      <h2>Registra tu mascota ahora</h2>
      <form className={styles.form_edit} onSubmit={handleSubmit} >
        <div className={styles.row_edit}>
            <label htmlFor='imagePet'>Foto de tu adorable mascota
            </label>
            <input id='imagePet' type='file' name='imagePet' accept="image/png, image/jpeg" value={formEntries.image} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='nombre'>Nombre
          </label>
          <input type='text' required id='nombre' name='nombre' value={formEntries.nombre} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='n_chip'>Numero de chip
          </label>
          <input type='number' id='n_chip' name='n_chip' value={formEntries.n_chip} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='fecha_nac'>Fecha de nacimiento
          </label>
          <input type='date' id='fecha_nac' name='fecha_nac' value={formEntries.fecha_nac} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <label htmlFor='tipo'>Que animal es?
          </label>
          <select id='tipo' name='tipo' value={formEntries.tipo} onChange={handleFormEntries} required>
            {optionsAnimalTypes.map(({ value, displayText }, index) => {
              return <option key={index} disabled={index === 0 && true} value={value}>{displayText}</option>
            })}
          </select>
        </div>
        <Button type='submit' disabled={!formEntries.nombre || !formEntries.tipo} >Añadir</Button>
      </form>
    </section>
  )
}
export default AddNewPet
