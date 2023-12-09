import Menu from 'components/Menu'

import Head from 'next/head'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Layout({
  children,
  title
}: {
  children: React.ReactNode
  title?: string
}) {
  const github = <Link href="https://github.com/kplattret/kevinplattret.com">GitHub</Link>
  const email = <Link href="mailto:kevin@plattret.com">email</Link>
  const pgpKey = <Link href="https://keys.openpgp.org/search?q=kevin@plattret.com">PGP key</Link>
  const matrix = <Link href="https://matrix.to/#/@kplattret:matrix.org">Matrix</Link>

  return (
    <>
      <Head>
        <title>{`${title ? title + " | " : ""} Kevin Plattret, Software Engineer`}</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/icons/favicon.png" />
      </Head>

      <header className="header">
        <Link href="/" className="alt">Kevin Plattret</Link>
        <Menu items={[
          ["reads", "^/(reads|bookshelves)"],
          ["thoughts"],
          ["work"]
        ]} />
      </header>

      <main className="content">
        {children}
      </main>

      <footer className="footer">
        <p>Written by Kevin Plattret in London and other places. Source code available on {github}.
          Feel free to reach out via {email} ({pgpKey}) or on {matrix}.</p>
      </footer>

      <Analytics />
      <SpeedInsights />
    </>
  )
}
