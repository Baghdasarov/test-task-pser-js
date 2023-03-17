export function roundToTop(num, decimalPlaces = 2) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.ceil(num * factor) / factor
}

export function getUtcYearAndWeekNumber(dateString) {
  const MsInMonth = 86400000
  const date = new Date(dateString)

  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - (utcDate.getUTCDay() || 7))

  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1))

  const weekNumber = Math.ceil(((utcDate - yearStart) / MsInMonth + 1) / 7)
  const year = utcDate.getFullYear()

  return {
    year,
    weekNumber,
  }
}
