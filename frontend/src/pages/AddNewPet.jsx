import { useState } from 'react'
import Button from '../components/Button'
import styles from './AddNewPet.module.css'
import useAuth from '../hooks/useAuth'
import usePets from '../hooks/usePets'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import Input from '../components/form/Input'
import Label from '../components/form/Label'
import Select from '../components/form/Select'
import Form from '../components/formPet/Form'
import Row from '../components/formPet/Row'
import { addNewPet } from '../services/pets.services'
import { optionsAnimalTypes, optionsGenderTypes } from '../constants/petForm'

const initialFormState = {
  nombre: '',
  n_chip: '',
  fecha_nac: '',
  raza: '',
  genero: '',
  vacuna_basica: false,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formEntries.nombre) {
      // TODO: Set error
      return
    }

    const formData = new FormData()
    for (const key in formEntries) {
      formData.append(key, formEntries[key])
    }

    const { result, error } = await addNewPet({ body: formData, jwt: user.jwt })
    if (error) {
      console.log(error)
      return
    }
    addNewPetCtx(result)
    navigator(ROUTES.HOME)
  }

  return (
    <section className={styles.section}>
      <h2>Registra tu mascota ahora</h2>
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
          <Input type='date' id='fecha_nac' name='fecha_nac' value={formEntries.fecha_nac} onChange={handleFormEntries} />
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
        <Button type='submit' disabled={!formEntries.nombre || !formEntries.tipo} >Añadir</Button>
      </Form>
    </section>
  )
}
export default AddNewPet
