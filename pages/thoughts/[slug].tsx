import Image from 'next/image'
import Date from 'components/Date'
import Layout from 'components/Layout'
import { getAllPostSlugs, getPostData } from 'lib/posts'

import { GetStaticPaths, GetStaticProps } from 'next'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    image: string
    content: string
  }
}) {
  return (
    <Layout title={postData.title}>
      {postData.image &&
        <Image
          src={postData.image}
          width={910}
          height={390}
          alt={postData.title}
          className="banner-image"
        />
      }

      <article itemScope itemType="http://schema.org/BlogPosting">
        <header>
          <h1 className="post-title" itemProp="name headline">{postData.title}</h1>
          <Date dateString={postData.date} />
        </header>

        <div itemProp="articleBody">
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug as string)

  return {
    props: {
      postData
    }
  }
}
