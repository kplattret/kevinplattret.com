import camelcaseKeys from 'camelcase-keys'
import fs from 'fs'
import groupBy from 'lodash/groupBy'
import html from 'remark-html'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'

export function getAllFileNamesForResource(resourceType: string) {
  return fs.readdirSync(path.join(process.cwd(), `data/${resourceType}`))
}

export async function getSingleFileData(
  resourceIdentifier: string,
  resourceType: string,
  withContent: boolean
) {
  const contentDirectory = path.join(process.cwd(), `data/${resourceType}`)
  const fileName = resourceIdentifier.endsWith('.md') ?
    resourceIdentifier : getFileNameForResource(contentDirectory, resourceIdentifier, 'md')
  const id = fileName.replace(/\.md$/, '')
  const slug = id.substring(11)

  const imagesDirectory = path.join(process.cwd(), `public/images/${resourceType}`)
  const imageFileName = getFileNameForResource(imagesDirectory, slug, '[jpg|png]')
  const image = imageFileName ? (`/images/${resourceType}/${imageFileName}`) : null

  const fullPath = path.join(contentDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const metaData = camelcaseKeys(matterResult.data)
  const content = withContent ? await processContent(matterResult.content) : null

  return {
    id,
    slug,
    image,
    ...(metaData),
    content
  }
}

export function sortItemsInAscendingOrder(items: object[], key: string) {
  return items.sort((a, b) => {
    if (a[key] < b[key]) { return 1 } else { return -1 }
  })
}

export function getAllSlugsForResource(resourceType: string) {
  const fileNames = fs.readdirSync(path.join(process.cwd(), `data/${resourceType}`))

  return fileNames.map(fileName => {
    return {
      params: {
        slug: getSlugFromFileName(fileName)
      }
    }
  })
}

export function groupItemsByYear(items: object[]) {
  // TODO: use Object.groupBy once added to ESNext
  return groupBy(items, finishedYear)
}

function getFileNameForResource(
  directory: string,
  slug: string,
  extension: string
) {
  const fileNames = fs.readdirSync(directory)
  const regex = RegExp(`\\d{4}-\\d{2}-\\d{2}-${slug}.${extension}`)

  return fileNames.find(e => regex.test(e))
}

async function processContent(content: string) {
  const processedContent = await remark().use(html).process(content)

  return processedContent.toString()
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, '').substring(11)
}

function finishedYear({ finishedOn }) {
  return finishedOn.slice(0, 4)
}
