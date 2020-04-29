import fs from 'fs'
import html from 'remark-html'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'

const imagesDirectory = path.join(process.cwd(), 'public/images')
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Remove date from id to get slug
    const slug = id.substr(11)

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id and slug
    return {
      id,
      slug,
      ...matterResult.data
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) { return 1 } else { return -1 }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '').substr(11)
      }
    }
  })
}

export async function getPostData(slug) {
  // Get filename from slug
  const fileName = findFileName(postsDirectory, slug, 'md')

  // Set the id
  const id = fileName.replace(/\.md$/, '')

  // Get banner image
  const imageFileName = findFileName(imagesDirectory, slug, '[jpg|png]')
  const bannerImage = imageFileName ? (`/images/${imageFileName}`) : null

  // Get file content
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id, slug, bannerImage and contentHtml
  return {
    id,
    slug,
    bannerImage,
    contentHtml,
    ...matterResult.data
  }
}

function findFileName(directory, slug, extension) {
  const fileNames = fs.readdirSync(directory)
  const regex = RegExp(`\\d{4}-\\d{2}-\\d{2}-${slug}.${extension}`)

  return fileNames.find(e => regex.test(e))
}
