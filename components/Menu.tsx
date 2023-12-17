import { formatAsTitle, getActiveClass } from 'lib/utils-ui'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu({
  items
}: {
  items: string[][]
}) {
  const path = usePathname()

  return (
    <nav className="navigation" >
      <ul>
        {items.map(([slug, regex]) => {
          return (
            <li key={slug}>
              <Link href={`/${slug}`} className={`alt ${getActiveClass(path, regex)}`}>
                {formatAsTitle(slug)}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav >
  )
}
