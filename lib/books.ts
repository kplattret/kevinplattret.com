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

  return limitedBooksData.length > 24 ? groupItemsByYear(limitedBooksData) : limitedBooksData
}

export async function getBookshelvesWithCount() {
  const fileNames = getAllFileNamesForResource('books')
  const allBooksData = await Promise.all(fileNames.map(fileName => {
    return getSingleFileData(fileName, 'books', false)
  }))
  const bookshelvesData = { "all": [] }

  allBooksData.forEach(book => {
    bookshelvesData["all"].push(book["slug"])

    book["bookshelves"].forEach((bookshelf: string) => {
      bookshelvesData.hasOwnProperty(bookshelf) ? bookshelvesData[bookshelf].push(book["slug"]) :
        (bookshelvesData[bookshelf] = [book["slug"]])
    })
  })

  const bookshelvesCounts: { _?: number } = {}

  for (let [bookshelf, books] of Object.entries(bookshelvesData)) {
    bookshelvesCounts[bookshelf] = books.length
  }

  const sortedBookshelvesCounts = Object.fromEntries(
    Object.entries(bookshelvesCounts).sort().sort(([_k1, v1], [_k2, v2]) => v2 - v1)
  )

  return sortedBookshelvesCounts
}

export async function getAllBookSlugs() {
  return getAllSlugsForResource('books')
}

export async function getBookData(slug: string) {
  return await getSingleFileData(slug, 'books', true)
}
