import Link from 'next/link'

import Layout from '@/components/Layout'

const title = '404 Not Found'

export default function Custom404() {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <p>This resource was moved or was never here in the first place. Unless you were looking for
        the 404 page of course.</p>

      <p>Maybe have a look at the things I <Link href="/thoughts">wrote</Link> about
        or <Link href="/reads">read</Link> about, otherwise feel free to reach out.</p>
    </Layout>
  )
}
