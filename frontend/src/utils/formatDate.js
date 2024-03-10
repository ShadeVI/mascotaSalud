export const formatDateYYYYmmdd = (date) => {
  if (!date) return ''
  const dateObj = new Date(date)
  return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`
}
