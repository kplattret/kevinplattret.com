import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout title={postData.title}>
      {postData.bannerImage && <img src={postData.bannerImage} alt={postData.title} />}

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

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)

  return {
    props: {
      postData
    }
  }
}
