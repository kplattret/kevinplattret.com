import {
  getAllFileNamesForResource,
  getAllSlugsForResource,
  getSingleFileData,
  sortItemsInAscendingOrder,
} from '@/lib/utils'

export async function getSortedPostsData() {
  const fileNames = getAllFileNamesForResource('posts')
  const allPostsData = await Promise.all(fileNames.map(fileName => {
    return getSingleFileData(fileName, 'posts', false)
  }))

  return sortItemsInAscendingOrder(allPostsData, 'date')
}

export async function getAllPostSlugs() {
  return getAllSlugsForResource('posts')
}

export async function getPostData(slug: string) {
  return await getSingleFileData(slug, 'posts', true)
}
