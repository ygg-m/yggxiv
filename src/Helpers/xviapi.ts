import axios from "axios";

interface Pagination {
  Page: number;
  PageNext: number | null;
  PagePrev: number | null;
  PageTotal: number;
  Results: number;
  ResultsPerPage: number;
  ResultsTotal: number;
}

interface FreeCompany {
  Crest: string[];
  ID: string;
  Name: string;
  Server: string;
}

interface FreeCompanySearchResult {
  Pagination: Pagination;
  Results: FreeCompany[];
}

export async function searchFreeCompany(
  name: string,
  server: string
): Promise<FreeCompanySearchResult> {
  const url = `https://xivapi.com/freecompany/search?name=${name}&server=${server}`;
  const response = await axios.get(url);
  const data = response.data;

  const freeCompanies: FreeCompany[] = data.Results.map((result: any) => {
    return {
      Crest: result.Crest,
      ID: result.ID,
      Name: result.Name,
      Server: result.Server,
    };
  });

  const pagination: Pagination = {
    Page: data.Pagination.Page,
    PageNext: data.Pagination.PageNext,
    PagePrev: data.Pagination.PagePrev,
    PageTotal: data.Pagination.PageTotal,
    Results: data.Pagination.Results,
    ResultsPerPage: data.Pagination.ResultsPerPage,
    ResultsTotal: data.Pagination.ResultsTotal,
  };

  return {
    Pagination: pagination,
    Results: freeCompanies,
  };
}
