import { ICategory } from "../lib/types";

export const mockCategories: ICategory[] = [
  {
    id: "1",
    name: "LED-драйвер/контроллер",
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
    name: "USB розетка",
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
