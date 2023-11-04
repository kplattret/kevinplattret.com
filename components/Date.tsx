import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)

  // See options at: https://date-fns.org/v2.12.0/docs/format
  return (
    <time dateTime={dateString} itemProp="datePublished">
      {format(date, 'EEEE, do MMMM yyyy')}
    </time>
  )
}
