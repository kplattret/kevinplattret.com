import isArray from 'lodash/isArray'
import Link from 'next/link'

export default function Labels({ list }: { list: [string] | { _: number } }) {
  return (
    <ul className="book-labels">
      {isArray(list) ? (
        list.map((label: string) => (
          <li key={`label-${label}`}>
            <Link href={`/bookshelves/${label}`}>{formatLabel(label)}</Link>
          </li>
        ))
      ) : (
        <>
          <li><Link href="/bookshelves">all <span>{list["all"]}</span></Link></li>

          {Object.keys(list).slice(1).map((bookshelf: string) => (
            <li key={`label-${bookshelf}`}>
              <Link href={`/bookshelves/${bookshelf}`}>
                {formatLabel(bookshelf)} <span>{list[bookshelf]}</span>
              </Link>
            </li>
          ))}
        </>
      )}
    </ul>
  )
}

function formatLabel(string: string) {
  return string.replace(/-/, ' ')
}
