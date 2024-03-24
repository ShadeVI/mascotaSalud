import { useState } from 'react'
import styles from './UpdatePet.module.css'
import Input from '../components/form/Input'
import Label from '../components/form/Label'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import Select from '../components/form/Select'
import Button from '../components/Button'

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

const optionsGenderTypes = [
  {
    value: '',
    displayText: 'Seleccione una opción'
  },
  {
    value: 'H',
    displayText: 'Hembra'
  },
  {
    value: 'M',
    displayText: 'Macho'
  }
]

const initialFormState = {
  nombre: '',
  n_chip: '',
  fecha_nac: '',
  raza: '',
  genero: '',
  vacunaBasica: false,
  tipo: optionsAnimalTypes[0].value,
  imagePet: null
}

const UpdatePet = () => {
  const { user } = useAuth()
  const { updatePetCtx } = usePets()
  const [formEntries, setFormEntries] = useState(initialFormState)

  const handleFormEntries = (e) => {
    setFormEntries((prev) => {
      if (e.target.type === 'file') {
        return {
          ...prev,
          [e.target.name]: e.target.files[0]
        }
      }
      if (e.target.type === 'checkbox') {
        return {
          ...prev,
          [e.target.name]: e.target.checked
        }
      }
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  return (
    <section className={styles.section}>
      <h2>Actualiza los datos</h2>
      <form className={styles.form_edit} onSubmit={() => console.log('eh')} >
        <div className={styles.row_edit}>
            <Label htmlFor='imagePet' text='Foto de tu adorable mascota' />
            <input id='imagePet' type='file' name='imagePet' accept="image/png, image/jpeg" value={formEntries.image} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <Label htmlFor='nombre' text='Nombre'/>
          <Input type='text' required id='nombre' name='nombre' value={formEntries.nombre} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <Label htmlFor='n_chip' text='Numero de chip' />
          <Input type='number' id='n_chip' name='n_chip' value={formEntries.n_chip} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <Label htmlFor='fecha_nac' text='Fecha de nacimiento' />
          <Input type='date' id='fecha_nac' name='fecha_nac' value={formEntries.fecha_nac} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <Label htmlFor='tipo' text='Que animal es?' />
          <Select id='tipo' name='tipo' value={formEntries.tipo} onChange={handleFormEntries} required options={optionsAnimalTypes} />
        </div>
        <div className={styles.row_edit}>
          <Label htmlFor='raza' text='Raza' />
          <Input type='text' id='raza' name='raza' value={formEntries.raza} onChange={handleFormEntries} />
        </div>
        <div className={styles.row_edit}>
          <Label htmlFor='genero' text='Genero' />
          <Select id='genero' name='genero' value={formEntries.genero} onChange={handleFormEntries} required options={optionsGenderTypes} />
        </div>
        <div className={[styles.row_edit, styles.row_edit__inline].join(' ')}>
          <Label htmlFor='vacunaBasica' text='Vacuna basica?' />
          <Input type='checkbox' id='vacunaBasica' name='vacunaBasica' checked={formEntries.vacunaBasica} onChange={handleFormEntries} />
        </div>
        <Button type='submit'>Añadir</Button>
      </form>
    </section>
  )
}
export default UpdatePet
