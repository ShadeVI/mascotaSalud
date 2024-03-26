const GENDERS_MAP = {
  M: 'Macho',
  H: 'Hembra'
}

export const convertGender = (gender) => GENDERS_MAP[gender] || 'N/D'

export const convertBoolAnswer = (boolAnswer) => boolAnswer ? 'Si' : 'No'

export const formatPetObjectToForm = (obj) => {
  const newObj = {}
  for (const key in obj) {
    if (obj[key] === null) newObj[key] = ''
    else newObj[key] = obj[key]
  }
  return newObj
}
