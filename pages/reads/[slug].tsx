import Image from 'next/image'
import DateRange from 'components/DateRange'
import Labels from 'components/Labels'
import Layout from 'components/Layout'
import { getAllBookSlugs, getBookData, getBookshelvesDictionary } from 'lib/books'

import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Book({
  bookData,
  bookshelvesDictionary
}: {
  bookData: {
    image: string
    title: string
    author: string
    startedOn: string
    finishedOn: string
    bookUrl: string
    reviewUrl: string
    bookshelves: [string]
    content: string
  }
  bookshelvesDictionary: {
    _: string
  }
}) {
  return (
    <Layout title={bookData.title}>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <Link className="book-image" href={bookData.bookUrl}>
          <Image
            src={bookData.image}
            width={910}
            height={390}
            alt={`${bookData.title}, by ${bookData.author}`}
          />
        </Link>

        <header>
          <h1 className="book-title" itemProp="name headline">{bookData.title}</h1>
          <h3 className="book-author">{bookData.author}</h3>

          <Labels
            items={bookData.bookshelves}
            pathPrefix="/bookshelves"
            dictionary={bookshelvesDictionary}
          />

          <Link className="book-date" href={bookData.reviewUrl}>
            <DateRange
              verb={"Read"}
              startDate={bookData.startedOn}
              endDate={bookData.finishedOn}
            />
          </Link>
        </header>

        <div itemProp="articleBody">
          <div dangerouslySetInnerHTML={{ __html: bookData.content }} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBookSlugs()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookData = await getBookData(params.slug as string)
  const bookshelvesDictionary = await getBookshelvesDictionary()

  return {
    props: {
      bookData,
      bookshelvesDictionary
    }
  }
}
