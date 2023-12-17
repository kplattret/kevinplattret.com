import Labels from 'components/Labels'
import Layout from 'components/Layout'
import { getAllBookshelfSlugs, getBookshelvesWithCount, getSortedBooksData } from 'lib/books'

import Image from 'next/image'
import Link from 'next/link'
import isArray from 'lodash/isArray'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Reads({
  allBookshelvesWithCount,
  bookshelfData,
  bookshelfName,
  bookshelfYears
}: {
  allBookshelvesWithCount: {
    _: number
  }
  bookshelfData: {
    id: string
    slug: string
    image: string
    title: string
    author: string
  }[]
  bookshelfName: string
  bookshelfYears?: string[]
}) {
  return (
    <Layout title={`Bookshelf: ${bookshelfName}`}>
      <h1>Bookshelves</h1>

      <Labels
        items={allBookshelvesWithCount}
        pathPrefix="/bookshelves"
      />

      {bookshelfYears ? bookshelfYears.map(year => (
        <div key={year} className="book-year">
          <h2>{year}</h2>

          <ul className="book-list">
            {bookshelfData[year].map(({ id, slug, image, title, author }) => (
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
      )) :
        <ul className="book-list">
          {bookshelfData.map(({ id, slug, image, title, author }) => (
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
      }
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBookshelfSlugs()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const bookshelfName = context["params"]["slug"].toString()
  const allBookshelvesWithCount = await getBookshelvesWithCount()
  const bookshelfData = await getSortedBooksData(null, bookshelfName)
  const bookshelfYears = isArray(bookshelfData) ? null : Object.keys(bookshelfData).sort().reverse()

  return {
    props: {
      allBookshelvesWithCount,
      bookshelfData,
      bookshelfName,
      bookshelfYears
    }
  }
}
