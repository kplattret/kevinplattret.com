import {
  getAllFileNamesForResource,
  getAllSlugsForResource,
  getSingleFileData,
  sortItemsInAscendingOrder,
} from 'lib/utils'

export async function getSortedBooksData() {
  const fileNames = getAllFileNamesForResource('books')
  const allBooksData = await Promise.all(fileNames.map(fileName => {
    return getSingleFileData(fileName, 'books', false)
  }))

  return sortItemsInAscendingOrder(allBooksData, 'finishedOn')
}

export async function getAllBookSlugs() {
  return getAllSlugsForResource('books')
}

export async function getBookData(slug: string) {
  const data = await getSingleFileData(slug, 'books', true)

  return data
}
