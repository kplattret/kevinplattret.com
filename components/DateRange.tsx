import { parseISO, format } from 'date-fns'

export default function Date({
  verb,
  startDate,
  endDate
}: {
  verb: string
  startDate: string
  endDate: string
}) {
  const startDateParsed = parseISO(startDate)
  const startYear = format(startDateParsed, 'yyyy')
  const startMonth = format(startDateParsed, 'MMMM')
  const endDateParsed = parseISO(endDate)
  const endYear = format(endDateParsed, 'yyyy')
  const endMonth = format(endDateParsed, 'MMMM')

  const dateRange = (startYear != endYear) ?
    `from ${startMonth} ${startYear} to ${endMonth} ${endYear}` : (startMonth != endMonth) ?
      `from ${startMonth} to ${endMonth} ${endYear}` : `in ${endMonth} ${endYear}`

  const sentence = [verb, dateRange].join(" ")

  // See options at: https://date-fns.org/v2.12.0/docs/format
  return (
    <time dateTime={endDate} itemProp="datePublished">{sentence}</time>
  )
}
