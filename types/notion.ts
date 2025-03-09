export interface NotionRollup {
  type: string;
  rollup: {
    array: {
      title: NotionText[];
    }[]
  }
}

export interface NotionRelation {
  id: string;
  type: string;
  relation: {
    id: string;
  }
  has_more: boolean;
}

export interface NotionText {
  type: string;
  text: {
    content: string;
    link: string | null;
  },
  annotations: NotionTextAnnotation;
  plain_text: string;
  href: string | null;
}

export interface NotionTextAnnotation {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface NotionSelect {
  id: string;
  name: string;
  color: string;
}

export interface NotionStatus {
  id: string;
  name: string;
  color: string;
}

export interface NotionDate {
  start: string | null;
  end: string | null;
  timezone: string | null;
}

type NotionBlockType = "heading_1" | "heading_2" | "bulleted_list_item" | "paragraph" | "quote" | "image";

export interface NotionBlockResponse {
  results: NotionBlock[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface NotionBlock {
  id: string;
  type: NotionBlockType;
  [key: string]: NotionBlockContent | NotionBlockImageContent | string | boolean | undefined;
}

export interface NotionBlockContent {
  rich_text: NotionText[];
  color: string;
}

export interface NotionBlockImageContent {
  type: string;
  external: {
    url: string;
  }
}