import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title && title + " | "}Kevin Plattret, Software Engineer</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/icons/favicon.png" />
      </Head>

      <header className="header">
        <Link href="/"><a className="alt">Kevin Plattret</a></Link>

        <nav className="navigation">
          <ul>
            <li><Link href="/blog"><a className="alt">Blog</a></Link></li>
            <li><Link href="/work"><a className="alt">Work</a></Link></li>
          </ul>
        </nav>
      </header>

      <main className="content">{children}</main>

      <footer className="footer">
        <p>Written by Kevin Plattret in London and other places. Source code available
          on <a href="https://github.com/kplattret/kevinplattret.com">GitHub</a>. Feel free to reach
          out via <a href="mailto:kevin@plattret.com">email</a>.</p>
      </footer>
    </>
  )
}
