import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { getSortedBooksData } from '@/lib/books'

import Layout from '@/components/Layout'

const title = 'Reads'

export default function Reads({
  latestBooksData
}: {
  latestBooksData: {
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

      <p>I do love to read. In fact, I always have at least one book going at any given time, with a
        healthy mix of fiction and non-fiction, and inevitably quite a few technology titles. Here
        are some of my latest reads for which I wrote a review or just some quick notes.</p>

      <p>Browse my <Link href="/bookshelves">bookshelves</Link> for more or find me
        on <Link href="https://goodreads.com/kplattret">Goodreads</Link>.</p>

      <ul className="book-list recent">
        {latestBooksData.map(({ id, slug, image, title, author }) => (
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
  const latestBooksData = await getSortedBooksData(8)

  return {
    props: {
      latestBooksData
    }
  }
}
