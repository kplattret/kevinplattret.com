import DateRange from '../../components/DateRange'
import Image from 'next/image'
import Labels from '../../components/Labels'
import Layout from '../../components/layout'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllBookIds, getBookData } from '../../lib/books'

export default function Book({
  bookData
}: {
  bookData: {
    image: string
    title: string
    author: string
    startedOn: string
    finishedOn: string
    reviewUrl: string
    shelves: [string]
    contentHtml: string
  }
}) {
  return (
    <Layout title={bookData.title}>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <Image
          src={bookData.image}
          width={910}
          height={390}
          alt={bookData.title}
          className="book-image"
        />

        <header>
          <h1 className="book-title" itemProp="name headline">{bookData.title}</h1>
          <h3 className="book-author">{bookData.author}</h3>

          <Labels list={bookData.shelves} />

          <Link className="book-date" href={bookData.reviewUrl}>
            <DateRange
              verb={"Read"}
              startDate={bookData.startedOn}
              endDate={bookData.finishedOn}
            />
          </Link>
        </header>

        <div itemProp="articleBody">
          <div dangerouslySetInnerHTML={{ __html: bookData.contentHtml }} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllBookIds()

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