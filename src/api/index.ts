import Search from "antd/es/transfer/search";
import { mockCategories } from "@/mock-data/categories";
import { mockItems } from "@/mock-data/items";
import { categories } from "@/strore/slices";
import { is } from "@/utils/type-guards";
import { ICategory, IItem } from "./types";

export const fetchCategories = async () => {
  return Promise.resolve(mockCategories);
};

interface IFetchCatalogParams {
  search?: string | null;
}

export const fetchCatalog = async ({
  search,
}: IFetchCatalogParams): Promise<{
  items: IItem[];
  count: number;
  categories: ICategory[];
}> => {
  return new Promise((resolve, reject) => {
    if (is.empty(search)) {
      return setTimeout(
        () =>
          resolve({ items: mockItems, count: 100, categories: mockCategories }),
        0,
      );
    } else {
      return setTimeout(
        () =>
          resolve({
            items: mockItems.filter((item) => item.name.includes(search)),
            count: 20,
            categories: [
              mockCategories[0],
              mockCategories[1],
              mockCategories[2],
            ],
          }),
        0,
      );
    }
  });
};
