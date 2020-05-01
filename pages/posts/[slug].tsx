import Date from '../../components/date'
import Layout from '../../components/layout'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    bannerImage: string
    contentHtml: string
  }
}) {
  return (
    <Layout title={postData.title}>
      {postData.bannerImage &&
        <img src={postData.bannerImage} className="banner-image" alt={postData.title} />}

      <article itemScope itemType="http://schema.org/BlogPosting">
        <header>
          <h1 className="post-title" itemProp="name headline">{postData.title}</h1>
          <Date dateString={postData.date} />
        </header>

        <div itemProp="articleBody">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()

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
