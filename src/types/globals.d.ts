type Pagination = {
  index: number;
  total: number;
  size: number;
};

type SortOrder = "" | "desc" | "asc";

type QueryOptions<T> = Pagination &
  T & {
    sortBy: string;
    sortOrder: SortOrder;
  };

type SearchParams = Record<string, string | string[] | undefined>;

type BreadcrumbLinks = {
  title: string;
  href?: string;
}[];
