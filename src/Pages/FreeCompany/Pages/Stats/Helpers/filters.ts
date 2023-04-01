import { CollectibleTypes } from "@/Types";

export function filterByCollectQuery(data: CollectibleTypes[], query: string) {
  return data.filter((Collectible) =>
    Collectible.Data.Name.toLowerCase().includes(query.toLowerCase())
  );
}

export function filterByCharQuery(data: CollectibleTypes[], query: string) {
  if (query.length === 0) return data;

  return data.filter((Collectible) =>
    Collectible.Owners.some((owner) =>
      owner.Name.toLowerCase().includes(query.toLowerCase())
    )
  );
}

export function filterBySource(data: CollectibleTypes[], filter: string[]) {
  return data.filter((Collectible) =>
    Collectible.Data.FFXIVCollectData.Sources.find((el) =>
      filter.includes(el.type)
    )
  );
}

export function filterList(
  arr: CollectibleTypes[],
  char: string,
  collect: string,
  source: string[]
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
      filterByCharQuery(filterBySource(arr, source), char),
      collect
    );
  //
  if (SourceOnly) return filterByCharQuery(filterBySource(arr, source), char);
  else return filterByCharQuery(arr, char);
}
