import { useEffect, useState } from 'react'
import styles from './UpdatePet.module.css'
import Input from '../components/form/Input'
import Label from '../components/form/Label'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import Select from '../components/form/Select'
import Button from '../components/Button'
import Row from '../components/formPet/Row'
import Form from '../components/formPet/Form'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import NotFound from '../components/NotFound'
import { formatPetObjectToForm } from '../utils/petProfileUtils'
import { formatDateYYYYmmdd } from '../utils/formatDate'

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
  vacuna_basica: false,
  tipo: optionsAnimalTypes[0].value,
  imagePet: ''
}

const UpdatePet = () => {
  const { user } = useAuth()
  const { idPet } = useParams()
  const { updatePetCtx, pets, isLoading } = usePets()
  const [formEntries, setFormEntries] = useState(initialFormState)
  const [selectedPet, setSelectedPet] = useState(null)

  useEffect(() => {
    const pet = pets.find((pet) => pet.ID === +idPet)
    setSelectedPet(pet)
    if (pet) {
      setFormEntries(formatPetObjectToForm(pet))
    }
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }

  if (!selectedPet) {
    return <NotFound />
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('SUBMIT')
  }

  return (
    <section className={styles.section}>
      <h2>Actualiza los datos</h2>
      <Form onSubmit={handleSubmit} >
        <Row>
            <Label htmlFor='imagePet' text='Foto de tu adorable mascota' />
            <Input id='imagePet' type='file' name='imagePet' accept="image/png, image/jpeg" value={formEntries.image} onChange={handleFormEntries} />
        </Row>
        <Row>
          <Label htmlFor='nombre' text='Nombre'/>
          <Input type='text' required id='nombre' name='nombre' value={formEntries.nombre} onChange={handleFormEntries} />
        </Row>
        <Row>
          <Label htmlFor='n_chip' text='Numero de chip' />
          <Input type='number' id='n_chip' name='n_chip' value={formEntries.n_chip} onChange={handleFormEntries} />
        </Row>
        <Row>
          <Label htmlFor='fecha_nac' text='Fecha de nacimiento' />
          <Input type='date' id='fecha_nac' name='fecha_nac' value={formatDateYYYYmmdd(formEntries.fecha_nac)} onChange={handleFormEntries} />
        </Row>
        <Row>
          <Label htmlFor='tipo' text='Que animal es?' />
          <Select id='tipo' name='tipo' value={formEntries.tipo} onChange={handleFormEntries} required options={optionsAnimalTypes} />
        </Row>
        <Row>
          <Label htmlFor='raza' text='Raza' />
          <Input type='text' id='raza' name='raza' value={formEntries.raza} onChange={handleFormEntries} />
        </Row>
        <Row>
          <Label htmlFor='genero' text='Genero' />
          <Select id='genero' name='genero' value={formEntries.genero} onChange={handleFormEntries} required options={optionsGenderTypes} />
        </Row>
        <Row inline={true}>
          <Label htmlFor='vacuna_basica' text='Vacuna basica?' />
          <Input type='checkbox' id='vacuna_basica' name='vacuna_basica' checked={formEntries.vacuna_basica} onChange={handleFormEntries} />
        </Row>
        <Button type='submit' >Actualizar</Button>
      </Form>
    </section>
  )
}
export default UpdatePet
