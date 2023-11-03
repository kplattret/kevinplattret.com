import camelcaseKeys from 'camelcase-keys'
import fs from 'fs'
import html from 'remark-html'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'

const imagesDirectory = path.join(process.cwd(), 'public/images/books')
const contentDirectory = path.join(process.cwd(), 'data/books')

export function getSortedBooksData() {
  // Get file names under /reads
  const fileNames = fs.readdirSync(contentDirectory)
  const allBooksData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Remove date from id to get slug
    const slug = id.substr(11)

    // Get cover image
    const imageFileName = findFileName(imagesDirectory, slug, '[jpg|png]')
    const image = imageFileName ? (`/images/books/${imageFileName}`) : null

    // Read markdown file as string
    const fullPath = path.join(contentDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    // Transform keys to camelCase
    const bookData = camelcaseKeys(matterResult.data)

    return {
      id,
      slug,
      image,
      ...(bookData as {
        finishedOn: string
      })
    }
  })

  // Sort by date, ascending
  return allBooksData.sort((a, b) => {
    if (a.finishedOn < b.finishedOn) { return 1 } else { return -1 }
  })
}

export function getAllBookIds() {
  const fileNames = fs.readdirSync(contentDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '').substr(11)
      }
    }
  })
}

export async function getBookData(slug: string) {
  // Get filename from slug
  const fileName = findFileName(contentDirectory, slug, 'md')

  // Set the id
  const id = fileName.replace(/\.md$/, '')

  // Get cover image
  const imageFileName = findFileName(imagesDirectory, slug, '[jpg|png]')
  const image = imageFileName ? (`/images/books/${imageFileName}`) : null

  // Get file content
  const fullPath = path.join(contentDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the book's metadata section
  const matterResult = matter(fileContents)
  // Transform keys to camelCase
  const bookData = camelcaseKeys(matterResult.data)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id, slug, coverImage and contentHtml
  return {
    id,
    slug,
    image,
    contentHtml,
    ...(bookData as {
      title: string,
      author: string,
      startedOn: string,
      finishedOn: string,
      bookUrl: string,
      reviewUrl: string,
      bookshelves: [string]
    })
  }
}

function findFileName(
  directory: string,
  slug: string,
  extension: string
) {
  const fileNames = fs.readdirSync(directory)
  const regex = RegExp(`\\d{4}-\\d{2}-\\d{2}-${slug}.${extension}`)

  return fileNames.find(e => regex.test(e))
}
