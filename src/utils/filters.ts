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
      result[id] = value[0];
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

export const upadetSearchParams = (
  searchParams: URLSearchParams,
  filtersValues: Record<string, string | string[]>,
) => {
  Object.entries(filtersValues).forEach(([id, value]) => {
    if (is.empty(value)) return;

    if (is.array(value)) {
      value.forEach((item) => searchParams.append(id, item));
    } else {
      searchParams.set(id, value);
    }
  });
};

export const rangeToString = ([min, max]: [string | undefined, string | undefined]) => {
  return `r[${min},${max}]`;
};

export const stringToRange = (value?: string) => {
  if (is.undefined(value)) return ["", ""];

  const match = value.match(/r\[(.*)\]/);
  if (is.empty(match)) {
    return ["", ""];
  } else {
    return match[1].split(",");
  }
};
