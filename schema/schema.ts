import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt, } from "graphql";
import { getBooksLength, handleBookShelf } from "../cache/books";

const NotionBlockImageContentExternal = new GraphQLObjectType({
  name: "NotionBlockImageContentExternal",
  fields: {
    url: { type: GraphQLString },
  }
})

const NotionBlockImageContent = new GraphQLObjectType({
  name: "NotionBlockImageContent",
  fields: {
    type: { type: GraphQLString },
    external: { type: NotionBlockImageContentExternal },
  }
})

const NotionBlockType = new GraphQLEnumType({
  name: "NotionBlockType",
  values: {
    heading_1: { value: "heading_1" },
    heading_2: { value: "heading_2" },
    bulleted_list_item: { value: "bulleted_list_item" },
    paragraph: { value: "paragraph" },
    quote: { value: "quote" },
    image: { value: "image" },
  }
})

const NotionTextAnnotation = new GraphQLObjectType({
  name: "NotionTextAnnotation",
  fields: {
    bold: { type: GraphQLBoolean },
    italic: { type: GraphQLBoolean },
    strikethrough: { type: GraphQLBoolean },
    underline: { type: GraphQLBoolean },
    code: { type: GraphQLBoolean },
    color: { type: GraphQLString },
  }
})

const NotionTextContent = new GraphQLObjectType({
  name: "NotionTextContent",
  fields: {
    content: { type: GraphQLString },
    link: { type: GraphQLString },
  }
})

const NotionText = new GraphQLObjectType({
  name: "NotionText",
  fields: {
    type: { type: GraphQLString },
    text: { type: NotionTextContent },
    annotations: { type: NotionTextAnnotation },
    plain_text: { type: GraphQLString },
    href: { type: GraphQLString },
  }
});

const NotionSelectType = new GraphQLObjectType({
  name: "NotionSelect",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }
})

const NotionStatusType = new GraphQLObjectType({
  name: "NotionStatus",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }
})

const NotionDate = new GraphQLObjectType({
  name: "NotionDate",
  fields: {
    start: { type: GraphQLString },
    end: { type: GraphQLString },
    timezone: { type: GraphQLString },
  }
})

const NotionRollupArray = new GraphQLObjectType({
  name: "NotionRollupArray",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    title: { type: new GraphQLList(NotionText) },
  }
})

const NotionRollup = new GraphQLObjectType({
  name: "NotionRollup",
  fields: {
    type: { type: GraphQLString },
    array: {
      type: new GraphQLList(NotionRollupArray),
    },
    function: {type: GraphQLString},
  }
})

const NotionRelation = new GraphQLObjectType({
  name: "NotionRelation",
  fields: {
    id: { type: GraphQLString },
  }
})

const NotionBlockContent = new GraphQLObjectType({
  name: "NotionBlockContent",
  fields: {
    rich_text: { type: new GraphQLList(NotionText) },
    color: { type: GraphQLString },
  }
})

const BookRateType = new GraphQLObjectType({
  name: "BookRate",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    select: { type: NotionSelectType },
  }
})

const BookStatusType = new GraphQLObjectType({
  name: "BookStatus",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: NotionStatusType },
  }
});

const BookReadingType = new GraphQLObjectType({
  name: "BookReading",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    rich_text: { type: new GraphQLList(NotionText) },
  }
})

const BookDateReadType = new GraphQLObjectType({
  name: "BookDateRead",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    date: { type: NotionDate },
  }
})

const BookAuthorType = new GraphQLObjectType({
  name: "BookAuthor",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    relation: { type: NotionRelation },
  }
})

const BookTitleType = new GraphQLObjectType({
  name: "BookTitle",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    title: { type: NotionText },
  }
})

const BookAuthorName = new GraphQLObjectType({
  name: "BookAuthorName",
  fields: {
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    rollup: { type: NotionRollup },
  }
})

const BookPropertiesType = new GraphQLObjectType({
  name: "BookProperties",
  fields: {
    Rate: { type: BookRateType },
    Author_Name: { type: BookAuthorName },
    Status: { type: BookStatusType },
    Reading: { type: BookReadingType },
    Date_Read: { type: BookDateReadType },
    Author: { type: BookAuthorType },
    Title: { type: new GraphQLList(BookTitleType)}
  }
})

export const BookType = new GraphQLObjectType({
  name: "Book",
  fields: {
    id: { type: GraphQLString },
    rate: { type: GraphQLInt},
    authorName: { type: GraphQLString },
    status: { type: GraphQLString },
    reading: { type: GraphQLString },
    dateRead: { type: GraphQLString },
    title: { type: GraphQLString },
  }
})

const NotionBlock = new GraphQLObjectType({
  name: "NotionBlock",
  fields: {
    id: { type: GraphQLString },
    type: { type: NotionBlockType },
    heading_1: { type: NotionBlockContent },
    heading_2: { type: NotionBlockContent },
    bulleted_list_item: { type: NotionBlockContent },
    paragraph: { type: NotionBlockContent },
    quote: { type: NotionBlockContent },
    image: { type: NotionBlockImageContent },
  }
})

type ServerErrorCode = "NOT_FOUND" | "INTERNAL_SERVER_ERROR" | "BAD_REQUEST" | "UNAUTHORIZED" | "FORBIDDEN" | "TOO_MANY_REQUESTS" | "CONFLICT" | "GONE" | "PAYLOAD_TOO_LARGE" | "UNSUPPORTED_MEDIA_TYPE" | "UNPROCESSABLE_ENTITY" | "TOO_MANY_REQUESTS" | "INTERNAL_SERVER_ERROR" | "BAD_GATEWAY" | "SERVICE_UNAVAILABLE" | "GATEWAY_TIMEOUT"

const getQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello World",
    },
    random: {
      type: GraphQLInt,
      args: {
        min: { type: GraphQLInt },
        max: { type: GraphQLInt },
      },
      resolve: (_, { min, max }) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    },
    bookshelf: {
      type: new GraphQLList(BookType),
      resolve: async () => {
        try {
          const result = await handleBookShelf()
          return result
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          return []
        }
      }
    },
    bookshelfLength: {
      type: GraphQLInt,
      resolve: async () => {
        try {
          const result = await getBooksLength()
          return result
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          return 0 
        }
      },
    }
  }
})

export const getSchema = new GraphQLSchema({
  query: getQueryType,
})