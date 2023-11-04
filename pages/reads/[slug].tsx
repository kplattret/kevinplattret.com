import Image from 'next/image'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

import DateRange from '../../components/DateRange'
import Labels from '../../components/Labels'
import Layout from '../../components/Layout'
import { getAllBookSlugs, getBookData } from '../../lib/books'

export default function Book({
  bookData
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
}) {
  return (
    <Layout title={bookData.title}>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <Link className="book-image" href={bookData.bookUrl}>
          <Image
            src={bookData.image}
            width={910}
            height={390}
            alt={bookData.title}
          />
        </Link>

        <header>
          <h1 className="book-title" itemProp="name headline">{bookData.title}</h1>
          <h3 className="book-author">{bookData.author}</h3>

          <Labels list={bookData.bookshelves} />

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

  return {
    props: {
      bookData
    }
  }
}
