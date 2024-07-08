import { ICategory } from "./types";

export const mockCategories: ICategory[] = [
  {
    id: "1",
    name: "Категория 1",
    children: [
      {
        id: "1.1",
        name: "Подкатегория 1.1",
      },
      {
        id: "1.2",
        name: "Подкатегория 1.2",
      },
    ],
  },
  {
    id: "2",
    name: "Категория 2",
    children: [
      {
        id: "2.1",
        name: "Подкатегория 2.1",
      },
      {
        id: "2.2",
        name: "Подкатегория 2.2",
      },
    ],
  },
];
