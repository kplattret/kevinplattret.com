import {
  getAllFileNamesForResource,
  getAllSlugsForResource,
  getSingleFileData,
  groupItemsByYear,
  sortItemsInAscendingOrder,
} from 'lib/utils'

import fs from 'fs'
import YAML from 'yaml'

export async function getSortedBooksData(limit?: number, bookshelf?: string) {
  const fileNames = getAllFileNamesForResource('books')
  const allBooksData = await Promise.all(fileNames.map(fileName => {
    return getSingleFileData(fileName, 'books', false)
  }))
  const booksData = bookshelf ? filterBooksByBookshelf(allBooksData, bookshelf) : allBooksData
  const sortedBooksData = sortItemsInAscendingOrder(booksData, 'finishedOn')
  const limitedBooksData = limit > 0 ? sortedBooksData.slice(0, limit) : sortedBooksData

  return limitedBooksData.length > 30 ? groupItemsByYear(limitedBooksData) : limitedBooksData
}

export async function getBookshelvesWithCount() {
  const bookshelvesCounts: { _?: number } = {}

  for (let [bookshelf, books] of Object.entries(await getBookshelvesData())) {
    bookshelvesCounts[bookshelf] = books.length
  }

  const allBookshelvesSortedByCount = Object.fromEntries(
    Object.entries(bookshelvesCounts).sort().sort(([_k1, v1], [_k2, v2]) => v2 - v1)
  )

  return allBookshelvesSortedByCount
}

export async function getAllBookSlugs() {
  return getAllSlugsForResource('books')
}

export async function getAllBookshelfSlugs() {
  return Object.keys(await getBookshelvesData()).slice(1).map(bookshelf => {
    return {
      params: {
        slug: bookshelf
      }
    }
  })
}

export async function getBookData(slug: string) {
  return await getSingleFileData(slug, 'books', true)
}

export function filterBooksByBookshelf(booksData: object[], bookshelfName: string) {
  return booksData.filter((book) =>
    book["bookshelves"].includes(bookshelfName)
  )
}

export async function getBookshelvesDictionary() {
  const labelsDictionary = fs.readFileSync('data/labels.yml', 'utf8')

  return YAML.parse(labelsDictionary)["bookshelves"]
}

async function getBookshelvesData() {
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

  return bookshelvesData
}
