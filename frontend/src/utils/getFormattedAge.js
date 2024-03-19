export const getFormattedAge = (fechaNac) => {
  if (!fechaNac) {
    return ''
  }

  const diff = new Date().getTime() - new Date(fechaNac).getTime()
  const day = 1000 * 60 * 60 * 24
  const days = Math.floor(diff / day)
  const months = Math.floor(days / 31)
  const years = Math.floor(months / 12)

  if (years >= 1) {
    return `${years} año${years > 1 ? 's' : ''}`
  }
  if (months >= 1) {
    return `${months} mes${months > 1 ? 'es' : ''}`
  }
  if (days > 0) {
    return `${days} día${days > 0 ? 's' : ''}`
  }
}
