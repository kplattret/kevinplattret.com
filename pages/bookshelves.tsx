import Layout from 'components/Layout'
import { getSortedBooksData } from 'lib/books'

import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next'

const title = 'Bookshelves'

export default function Reads({
  allBooksData,
  allBooksYears
}: {
  allBooksData: {
    id: string
    slug: string
    image: string
    title: string
    author: string
  }[]
  allBooksYears: string[]
}) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      {allBooksYears.map(year => (
        <div key={year}>
          <h2>{year}</h2>

          <ul className="book-list">
            {allBooksData[year].map(({ id, slug, image, title, author }) => (
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
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allBooksData = await getSortedBooksData()
  const allBooksYears = Object.keys(allBooksData).sort().reverse()

  return {
    props: {
      allBooksData,
      allBooksYears
    }
  }
}
