import { IFilter } from "@/app/api/catalog/route";
import { is } from "./type-guards";

export const isFilter = (param: string) => {
  if (param === "sort") return false;

  return true;
};

export const getFiltersValuesFromSearchParams = (searchParams: URLSearchParams) => {
  const result: Record<string, string | string[]> = {};

  Array.from(searchParams).forEach(([id, value]) => {
    if (!isFilter(id)) return;

    if (is.string(value)) {
      const match = value.match(/r\[(.*)\]/);
      if (is.empty(match)) {
        result[id] = value;
      } else {
        const range = match[1].split(",");
        result[id] = range;
      }
    } else {
      result[id] = value;
    }
  });

  return result;
};

export const upadetSearchParamsFromFiltersValues = (
  searchParams: URLSearchParams,
  filtersValues: Record<string, string | string[]>,
  filters: IFilter[],
) => {
  Object.entries(filtersValues).forEach(([id, value]) => {
    if (is.empty(value)) return;

    const filter = filters.find((item) => item.id === id);

    if (filter?.type === "Range") {
      searchParams.set(id, `r[${value}]`);
    } else if (is.array(value)) {
      value.forEach((item) => searchParams.append(id, item));
    } else {
      searchParams.set(id, value);
    }
  });
};
