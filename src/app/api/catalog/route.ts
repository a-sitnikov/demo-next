import { ICategory } from "@/api/types";
import { mockCategories } from "@/mock-data/categories";
import { mockItems } from "@/mock-data/items";
import { is } from "@/utils/type-guards";

export interface IItem {
  id: string;
  name: string;
  price: number;
  remains: number;
  description: string;
  img: string;
}

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
        () => resolve({ items: mockItems, count: 100, categories: mockCategories }),
        0,
      );
    } else {
      return setTimeout(
        () =>
          resolve({
            items: mockItems.filter((item) => item.name.includes(search)),
            count: 20,
            categories: [mockCategories[0], mockCategories[1], mockCategories[2]],
          }),
        0,
      );
    }
  });
};

export async function GET(request: Request) {
  return Response.json(mockItems);
}
