export type SearchResultType =
  | "section"
  | "blog"
  | "trainer"
  | "abonement"
  | "page";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: SearchResultType;
  category: string;
  icon: string;
}
