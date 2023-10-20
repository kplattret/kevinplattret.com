import Layout from '../components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { getSortedBooksData } from '../lib/books'

const title = 'Reads'

export default function Reads({
  allBooksData
}: {
  allBooksData: {
    id: string
    slug: string
    image: string
    title: string
  }[]
}) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <p>I love to read, and so I always have at least one book going at any given time. Here is a
        selection that I particularly enjoyed over the past few years, along with some personal
        thoughts.</p>

      <ul className="book-list">
        {allBooksData.map(({ id, slug, title, image }) => (
          <li key={id}>
            <Link href={`/reads/${slug}`} className="alt">
              <Image
                src={image}
                width={480}
                height={730}
                alt={title}
                className="book-image"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allBooksData = getSortedBooksData()

  return {
    props: {
      allBooksData
    }
  }
}
