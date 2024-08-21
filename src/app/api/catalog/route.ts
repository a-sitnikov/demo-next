import { Key } from "react";
import { ICategory } from "@/api/types";
import { mockCategories } from "@/mock-data/categories";
import { mockFilters } from "@/mock-data/filters";
import { mockItems } from "@/mock-data/items";
import { TDefaultListOption } from "@/ui/filters/list-filter";
import { TDefaultRadioOption } from "@/ui/filters/radio-filter";
import { TDefaultSmallListOption } from "@/ui/filters/small-list-filter";
import { is } from "@/utils/type-guards";

interface IFetchCatalogParams {
  search?: string | null;
}
export interface IItem {
  id: string;
  name: string;
  price: number;
  remains: number;
  description: string;
  img: string;
}

interface IRangeFilter {
  min?: number;
  max?: number;
  value?: [string | undefined, string | undefined];
}

export interface IListFilter {
  options: TDefaultListOption[];
  value?: Key[];
}

export interface ISmallListFilter {
  options: TDefaultSmallListOption[];
  value?: Key[];
}

export interface IRadioFilter {
  options: TDefaultRadioOption[];
  value?: Key;
}

export type IFilterProps = IListFilter | IRadioFilter | IRangeFilter;

export type IFilter = {
  id: string;
  name: string;
} & (
  | ({
      type: "List";
    } & IListFilter)
  | ({
      type: "SmallList";
    } & ISmallListFilter)
  | ({
      type: "Radio";
    } & IRadioFilter)
  | ({
      type: "Range";
    } & IRangeFilter)
);

export interface IAPICatalogData {
  items: IItem[];
  count: number;
  filters: IFilter[];
  categories: ICategory[];
}

export const fetchCatalog = async (searchParams: URLSearchParams): Promise<IAPICatalogData> => {
  return new Promise((resolve, reject) => {
    const search = searchParams.get("search");

    if (is.empty(search)) {
      return setTimeout(
        () =>
          resolve({
            items: mockItems,
            count: 100,
            categories: mockCategories,
            filters: mockFilters,
          }),
        0,
      );
    } else {
      return setTimeout(
        () =>
          resolve({
            items: mockItems.filter((item) => item.name.includes(search)),
            count: 20,
            categories: [mockCategories[0], mockCategories[1], mockCategories[2]],
            filters: mockFilters,
          }),
        0,
      );
    }
  });
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  const data = await fetchCatalog(url.searchParams);
  return new Response(JSON.stringify(data));
}
