import { formatAsTitle, getActiveClass } from 'lib/utils-ui'

import Link from 'next/link'
import isArray from 'lodash/isArray'
import { usePathname } from 'next/navigation'

export default function Labels({
  items,
  pathPrefix
}: {
  items: [string] | { _: number }
  pathPrefix
}) {
  const path = usePathname()

  return (
    <ul className="book-labels">
      {isArray(items) ? (
        items.map((label: string) => (
          <li key={`label-${label}`}>
            <Link href={`${pathPrefix}/${label}`}>{formatLabel(label)}</Link>
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
                {formatLabel(label)} <span>{items[label]}</span>
              </Link>
            </li>
          ))}
        </>
      )}
    </ul>
  )
}

function formatLabel(string: string) {
  return formatAsTitle(string.replace("-", " "))
}
