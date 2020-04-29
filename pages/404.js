import Layout from '../components/layout'
import Link from 'next/link'

const title = '404 Not Found'

export default function Custom404() {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <p>This resource was moved or was never here in the first place. Unless you were looking for
        the 404 page of course.</p>

      <p>You can always read some of the <Link href="/blog"><a>stuff I've written</a></Link>, and
        you might find what you were looking for before landing here.</p>
    </Layout>
  )
}
