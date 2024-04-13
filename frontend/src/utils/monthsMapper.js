export const monthsMapper = (monthNumber) => {
  const months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
  }
  if (monthNumber >= 0 && monthNumber <= 11) {
    return months[monthNumber]
  } else {
    throw new Error('Invalid month number')
  }
}
