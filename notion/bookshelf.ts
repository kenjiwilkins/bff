import { notion } from "./apiTemplate";
import { Book, BookDatabaseResponse } from "../types/books";
import { NotionBlock, NotionBlockResponse } from "../types/notion";

export async function getBookShelf(): Promise<Book[]> {
  try {
    const DATABASE_ID = process.env.NOTION_BOOKSHELF_DATABASE_ID;
    if (!DATABASE_ID) throw new Error("Database ID is required");
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: 10,
    }) as unknown as BookDatabaseResponse;
    return response.results
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error)
    }
    return Promise.reject(new Error("Unknown error"))
  }
}

export async function getBookContent(id: string): Promise<NotionBlock[]> {
  try {
    const DATABASE_ID = process.env.NOTION_BOOKSHELF_DATABASE_ID;
    if (!DATABASE_ID) throw new Error("Database ID is required");

    const response = await notion.blocks.children.list({
      block_id: id,
    }) as unknown as NotionBlockResponse;
    return response.results
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error)
    }
    return Promise.reject(new Error("Unknown error"))
  }
}