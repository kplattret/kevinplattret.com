import { formatAsTitle, getActiveClass } from 'lib/utils-ui'

import Link from 'next/link'
import isArray from 'lodash/isArray'
import { usePathname } from 'next/navigation'

export default function Labels({
  items,
  pathPrefix,
  dictionary
}: {
  items: [string] | { _: number }
  pathPrefix: string,
  dictionary: {
    _: string
  }
}) {
  const path = usePathname()

  return (
    <ul className="book-labels">
      {isArray(items) ? (
        items.map((label: string) => (
          <li key={`label-${label}`}>
            <Link href={`${pathPrefix}/${label}`}>{formatLabel(label, dictionary)}</Link>
          </li>
        ))
      ) : (
        <>
          <li>
            <Link href={pathPrefix} className={getActiveClass(path, `^${pathPrefix}$`)}>
              All <span>{items["all"]}</span>
            </Link>
          </li>

          {Object.keys(items).slice(1).map((label: string) => (
            <li key={`label-${label}`}>
              <Link
                href={`${pathPrefix}/${label}`}
                className={getActiveClass(path, `^${pathPrefix}/${label}$`)}
              >
                {formatLabel(label, dictionary)} <span>{items[label]}</span>
              </Link>
            </li>
          ))}
        </>
      )}
    </ul>
  )
}

function formatLabel(string: string, dictionary: { _: string }) {
  return dictionary[string] || formatAsTitle(string.replace("-", " "))
}
