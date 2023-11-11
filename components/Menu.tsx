import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu({
  items
}: {
  items: string[][]
}) {
  const pathname = usePathname()

  return (
    <nav className="navigation" >
      <ul>
        {items.map(item => {
          return (
            <li key={item[0]}>
              <Link
                href={`/${item[0]}`}
                className={`alt ${getActiveClass(pathname, item[0], item[1])}`}
              >
                {capitalise(item[0])}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav >
  )
}

function getActiveClass(pathname: string, name: string, regex?: string) {
  const isActive = regex ? pathname.match(new RegExp(regex)) : pathname.startsWith(`/${name}`)

  return isActive ? "active" : ""
}

function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
