import Date from '../components/date'
import Layout from '../components/layout'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getSortedPostsData } from '../lib/posts'

const title = 'Thoughts'

export default function Thoughts({
  allPostsData
}: {
  allPostsData: {
    id: string
    slug: string
    title: string
    date: string
  }[]
}) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <ul className="post-list">
        {allPostsData.map(({ id, slug, title, date }) => (
          <li key={id}>
            <Link href={`/thoughts/${slug}`} className="alt">{title}</Link>
            <Date dateString={date} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}