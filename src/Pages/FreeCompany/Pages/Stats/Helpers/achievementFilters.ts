import { AchievementsTypes } from "@/Types";

export function filterByCollectQuery(data: AchievementsTypes[], query: string) {
  return data.filter((Collectible) =>
    Collectible.Data.Name.toLowerCase().includes(query.toLowerCase())
  );
}

export function filterByCharQuery(data: AchievementsTypes[], query: string) {
  if (query.length === 0) return data;

  return data.filter((Collectible) =>
    Collectible.Owners.some((owner) =>
      owner.Name.toLowerCase().includes(query.toLowerCase())
    )
  );
}

export function filterByType(data: AchievementsTypes[], filter: string) {
  return data.filter((Collectible) => filter.includes(Collectible.Data.Group));
}

export function filterList(
  arr: AchievementsTypes[],
  char: string,
  collect: string,
  source: string
) {
  const isQueryEmpty = collect.length === 0;
  const isSourceEmpty = source.length === 0;

  const QueryOnly = !isQueryEmpty && isSourceEmpty;
  const SourceOnly = isQueryEmpty && !isSourceEmpty;
  const QueryAndSource = !isQueryEmpty && !isSourceEmpty;

  if (QueryOnly)
    return filterByCharQuery(filterByCollectQuery(arr, collect), char);
  //
  if (QueryAndSource)
    return filterByCollectQuery(
      filterByCharQuery(filterByType(arr, source), char),
      collect
    );
  //
  if (SourceOnly) return filterByCharQuery(filterByType(arr, source), char);
  else return filterByCharQuery(arr, char);
}
