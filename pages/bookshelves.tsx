import Layout from 'components/Layout'
import { getSortedBooksData } from 'lib/books'

import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next'

const title = 'Bookshelves'

export default function Reads({
  allBooksData
}: {
  allBooksData: {
    id: string
    slug: string
    image: string
    title: string
    author: string
  }[]
}) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <ul className="book-list">
        {allBooksData.map(({ id, slug, image, title, author }) => (
          <li key={id}>
            <Link href={`/reads/${slug}`} className="alt">
              <Image
                src={image}
                width={480}
                height={730}
                alt={`${title}, by ${author}`}
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
  const allBooksData = await getSortedBooksData()

  return {
    props: {
      allBooksData
    }
  }
}
