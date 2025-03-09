export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Book = {
  __typename?: 'Book';
  created_time?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_edited_time?: Maybe<Scalars['String']['output']>;
  properties?: Maybe<BookProperties>;
};

export type BookProperties = {
  __typename?: 'BookProperties';
  Rate?: Maybe<BookRate>;
};

export type BookRate = {
  __typename?: 'BookRate';
  id?: Maybe<Scalars['String']['output']>;
  select?: Maybe<NotionSelect>;
  type?: Maybe<Scalars['String']['output']>;
};

export type NotionBlock = {
  __typename?: 'NotionBlock';
  bulleted_list_item?: Maybe<NotionBlockContent>;
  heading_1?: Maybe<NotionBlockContent>;
  heading_2?: Maybe<NotionBlockContent>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<NotionBlockImageContent>;
  paragraph?: Maybe<NotionBlockContent>;
  quote?: Maybe<NotionBlockContent>;
  type?: Maybe<NotionBlockType>;
};

export type NotionBlockContent = {
  __typename?: 'NotionBlockContent';
  color?: Maybe<Scalars['String']['output']>;
  rich_text?: Maybe<Array<Maybe<NotionText>>>;
};

export type NotionBlockImageContent = {
  __typename?: 'NotionBlockImageContent';
  external?: Maybe<NotionBlockImageContentExternal>;
  type?: Maybe<Scalars['String']['output']>;
};

export type NotionBlockImageContentExternal = {
  __typename?: 'NotionBlockImageContentExternal';
  url?: Maybe<Scalars['String']['output']>;
};

export enum NotionBlockType {
  BulletedListItem = 'bulleted_list_item',
  Heading_1 = 'heading_1',
  Heading_2 = 'heading_2',
  Image = 'image',
  Paragraph = 'paragraph',
  Quote = 'quote'
}

export type NotionSelect = {
  __typename?: 'NotionSelect';
  color?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NotionText = {
  __typename?: 'NotionText';
  annotations?: Maybe<NotionTextAnnotation>;
  href?: Maybe<Scalars['String']['output']>;
  plain_text?: Maybe<Scalars['String']['output']>;
  text?: Maybe<NotionTextContent>;
  type?: Maybe<Scalars['String']['output']>;
};

export type NotionTextAnnotation = {
  __typename?: 'NotionTextAnnotation';
  bold?: Maybe<Scalars['Boolean']['output']>;
  code?: Maybe<Scalars['Boolean']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  italic?: Maybe<Scalars['Boolean']['output']>;
  strikethrough?: Maybe<Scalars['Boolean']['output']>;
  underline?: Maybe<Scalars['Boolean']['output']>;
};

export type NotionTextContent = {
  __typename?: 'NotionTextContent';
  content?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  bookshelf?: Maybe<Array<Maybe<Book>>>;
  bookshelfLength?: Maybe<Scalars['Int']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
  random?: Maybe<Scalars['Int']['output']>;
};


export type QueryRandomArgs = {
  max: Scalars['Int']['input'];
  min: Scalars['Int']['input'];
};
