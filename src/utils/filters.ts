import { IFilter } from "@/api/catalog";
import { is } from "./type-guards";

export const isFilter = (param: string) => {
  if (param === "sort") return false;

  return true;
};

export const searchParamsToObject = (searchParams: URLSearchParams) => {
  const result: Record<string, string | string[]> = {};

  Array.from(searchParams.keys()).forEach((id) => {
    if (!isFilter(id)) return;

    const value = searchParams.getAll(id);
    if (is.empty(value)) return;

    if (value.length === 1) {
      const val0 = value[0];
      const match = val0.match(/r\[(.*)\]/);
      if (is.empty(match)) {
        result[id] = val0;
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

export const objectToSearchParams = (obj: {} = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(obj).forEach(([id, value]) => {
    if (is.array(value)) {
      value.forEach((item) => searchParams.append(id, item as string));
    } else {
      searchParams.set(id, String(value));
    }
  });

  return searchParams;
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
