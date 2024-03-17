export const getFormattedAge = (fechaNac) => {
  if (!fechaNac) {
    return ''
  }

  const diff = new Date().getTime() - new Date(fechaNac).getTime()
  const day = 1000 * 60 * 60 * 24
  const days = Math.floor(diff / day)
  const months = Math.floor(days / 31)
  const years = Math.floor(months / 12)

  if (years > 1) {
    return `${years} años`
  }
  if (years === 1) {
    return `${years} año`
  }
  if (months >= 1) {
    return `${months} meses`
  }
  if (months === 1) {
    return `${months} meses`
  }
  if (days > 0) {
    return `${days} días`
  }
}
