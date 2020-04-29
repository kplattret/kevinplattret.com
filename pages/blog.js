import Date from '../components/date'
import Layout from '../components/layout'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

const title = 'Blog'

export default function Blog({ allPostsData }) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <ul className="post-list">
        {allPostsData.map(({ id, slug, title, date }) => (
          <li key={id}>
            <Link href="/posts/[slug]" as={`/posts/${slug}`}>
              <a className="alt">{title}</a>
            </Link>

            <Date dateString={date} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}
