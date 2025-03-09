import { NotionSelect, NotionRollup, NotionStatus, NotionText, NotionDate, NotionRelation } from "./notion";

export interface BookRate {
  id: string;
  type: string;
  select: NotionSelect | null;
}

export interface Status {
  id: string;
  type: string;
  status: NotionStatus | null;
}

export interface Reading {
  id: string;
  type: string;
  rich_text: NotionText[];
}

export interface DateRead {
  id: string;
  type: string;
  date: NotionDate;
}
export interface BookTitle {
  id: string;
  type: string;
  title: NotionText[];
}

export interface BookProperties {
  Rate: BookRate;
  Author_Name: NotionRollup | null;
  Status: Status;
  Reading: Reading;
  Date_Read: DateRead | null;
  Author: NotionRelation | null;
  Title: BookTitle;
}

export interface Book {
  id: string;
  created_time: string;
  last_edited_time: string;
  icon: {
    type: string;
    external?: {
      url: string;
    }
  } | null;
  properties: BookProperties;
}

export interface BookDatabaseResponse {
  results: Book[];
  next_cursor: string | null;
  has_more: boolean;
}