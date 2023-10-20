import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Menu({
  items
}: {
  items: string[]
}) {
  const pathname = usePathname()

  return (
    <nav className="navigation" >
      <ul>
        {items.map(name => {
          return (
            <li key={name}>
              <Link href={`/${name}`} className={`alt ${getActiveClass(pathname, name)}`}>
                {capitalise(name)}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav >
  )
}

function getActiveClass(pathname: string, name: string) {
  return pathname.startsWith(`/${name}`) ? "active" : ""
}

function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
