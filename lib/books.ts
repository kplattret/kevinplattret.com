import {
  getAllFileNamesForResource,
  getAllSlugsForResource,
  getSingleFileData,
  groupItemsByYear,
  sortItemsInAscendingOrder,
} from 'lib/utils'

export async function getSortedBooksData(limit?: number) {
  const fileNames = getAllFileNamesForResource('books')
  const allBooksData = await Promise.all(fileNames.map(fileName => {
    return getSingleFileData(fileName, 'books', false)
  }))
  const sortedBooksData = sortItemsInAscendingOrder(allBooksData, 'finishedOn')
  const limitedBooksData = limit > 0 ? sortedBooksData.slice(0, limit) : sortedBooksData

  return limitedBooksData.length > 8 ? groupItemsByYear(limitedBooksData) : limitedBooksData
}

export async function getAllBookSlugs() {
  return getAllSlugsForResource('books')
}

export async function getBookData(slug: string) {
  return await getSingleFileData(slug, 'books', true)
}
