export const formatDateIntl = (fecha) => fecha
  ? new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(fecha))
  : ''
