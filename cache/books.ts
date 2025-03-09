import { getBookContent, getBookShelf } from "../notion/bookshelf";
import { Book } from "../types/books";
import { NotionBlock } from "../types/notion";

interface BookType {
  id: string;
  rate: number | null;
  authorName: string;
  status: string | null;
  reading: string;
  dateRead: string | null;
  authorId: string | null;
  title: string | null;
}

const bookCache: { books: BookType[] | null, expiredAt: number | null } = {
  books: null,
  expiredAt: null
}

const bookContentCache: { [key: string]: { content: NotionBlock[] | null, expiredAt: number | null } } = {}

function formatBook(book: Book): BookType {
  return {
    id: book.id,
    rate: book.properties.Rate.select ? Number(book.properties.Rate.select.name) : 0,
    authorName: book.properties.Author_Name?.rollup.array[0].title[0].plain_text || "",
    status: book.properties.Status.status ? book.properties.Status.status.name : "",
    reading: book.properties.Reading.rich_text.map(text => text.plain_text).join(""),
    dateRead: book.properties.Date_Read ? book.properties.Date_Read.date?.start : "",
    title: book.properties.Title.title[0].plain_text || "",
    authorId: book.properties.Author ? book.properties.Author.relation.id : ""
  }
}

export async function handleBookShelf():Promise<BookType[]> {
  try {
    if (bookCache.books && bookCache.expiredAt && Date.now() < bookCache.expiredAt) {
      return bookCache.books
    }
    const result = await getBookShelf()
    bookCache.books = result.map(formatBook)
    bookCache.expiredAt = Date.now() + 1000 * 60
    return bookCache.books
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error)
    }
    return Promise.reject(new Error("Unknown error"))
  }
}

export async function getBooksLength():Promise<number> {
  try {
    const books = await handleBookShelf()
    return books.length
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error)
    }
    return Promise.reject(new Error("Unknown error"))
  }
}

export async function handleBookContent(id: string):Promise<NotionBlock[]> {
  try {
    if (bookContentCache[id] && bookContentCache[id].content && bookContentCache[id].expiredAt && Date.now() < bookContentCache[id].expiredAt) {
      return bookContentCache[id].content
    }
    const result = await getBookContent(id)
    bookContentCache[id] = {
      content: result,
      expiredAt: Date.now() + 1000 * 60
    }
    return result
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error)
    }
    return Promise.reject(new Error("Unknown error"))
  }
}