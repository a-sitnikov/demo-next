import { Key } from "react";
import { mockCategories } from "@/mock-data/categories";
import { mockFilters } from "@/mock-data/filters";
import { mockItems } from "@/mock-data/items";
import { resolveWithDelay } from "@/mock-data/utils";
import { searchParamsToObject } from "@/utils/filters";
import { is } from "@/utils/type-guards";

export interface IItem {
  id: string;
  name: string;
  price: number;
  remains: number;
  description: string;
  img: string;
}

export interface ICategory {
  id: string;
  title: string;
  parent?: string;
}

interface IRangeFilter {
  min?: number;
  max?: number;
  unit?: string;
}

export interface IFilterOption {
  id: string;
  name: string;
  disabled?: boolean;
  weight?: number;
}

export type IFilter = {
  id: string;
  name?: string;
  icon?: JSX.Element;
} & (
  | {
      type: "List" | "SmallList" | "Radio";
      options: IFilterOption[];
    }
  | ({
      type: "Range";
    } & IRangeFilter)
  | {
      type: "Bool";
    }
);

export interface IAPICatalogData {
  items: IItem[];
  count: number;
  filters: IFilter[];
  filtersValues: Record<string, string | string[]>;
  categories: ICategory[];
}

export const fetchCatalog = async (searchParams: URLSearchParams): Promise<IAPICatalogData> => {
  const search = searchParams.get("search");
  const filtersValues = searchParamsToObject(searchParams);

  if (is.empty(search)) {
    return resolveWithDelay(
      {
        items: mockItems,
        count: 100,
        categories: mockCategories,
        filters: mockFilters,
        filtersValues,
      },
      0,
    );
  } else {
    return resolveWithDelay(
      {
        items: mockItems.filter((item) => item.name.includes(search)),
        count: 20,
        categories: [mockCategories[0], mockCategories[1], mockCategories[2]],
        filters: mockFilters,
        searchParams,
        filtersValues,
      },
      0,
    );
  }
};
