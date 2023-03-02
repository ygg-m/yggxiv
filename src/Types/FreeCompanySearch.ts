import { FreeCompanySmall } from "./FreeCompanyData";

export interface Pagination {
  Page: number;
  PageNext: number | null;
  PagePrev: number | null;
  PageTotal: number;
  Results: number;
  ResultsPerPage: number;
  ResultsTotal: number;
}

export interface FreeCompanySearchResult {
  Pagination: Pagination;
  Results: FreeCompanySmall[];
}
