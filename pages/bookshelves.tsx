import Image from 'next/image'
import Link from 'next/link'
import isArray from 'lodash/isArray'
import { GetStaticProps } from 'next'

import { getBookshelvesDictionary, getBookshelvesWithCount, getSortedBooksData } from '@/lib/books'

import Labels from '@/components/Labels'
import Layout from '@/components/Layout'

const title = 'Bookshelves'

export default function Reads({
  allBooksData,
  allBooksYears,
  allBookshelvesWithCount,
  bookshelvesDictionary
}: {
  allBooksData: {
    id: string
    slug: string
    image: string
    title: string
    author: string
  }[]
  allBooksYears?: string[]
  allBookshelvesWithCount: {
    _: number
  }
  bookshelvesDictionary: {
    _: string
  }
}) {
  return (
    <Layout title={title}>
      <h1>{title}</h1>

      <Labels
        items={allBookshelvesWithCount}
        pathPrefix="/bookshelves"
        dictionary={bookshelvesDictionary}
      />

      {allBooksYears ? allBooksYears.map(year => (
        <div key={year} className="book-year">
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
      )) :
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
      }
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allBooksData = await getSortedBooksData()
  const allBooksYears = isArray(allBooksData) ? null : Object.keys(allBooksData).sort().reverse()
  const allBookshelvesWithCount = await getBookshelvesWithCount()
  const bookshelvesDictionary = await getBookshelvesDictionary()

  return {
    props: {
      allBooksData,
      allBooksYears,
      allBookshelvesWithCount,
      bookshelvesDictionary
    }
  }
}
