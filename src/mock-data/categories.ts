import { ICategory } from "../api/types";

export const mockCategories: ICategory[] = [
  {
    id: "1",
    title: "LED-драйвер/контроллер",
  },
  {
    id: "1.1",
    title: "Подкатегория 1.1",
    parent: "1",
  },
  {
    id: "1.2",
    title: "Подкатегория 1.2",
    parent: "1",
  },
  {
    id: "2",
    title: "USB розетка",
  },
  {
    id: "2.1",
    title: "Подкатегория 2.1",
    parent: "2",
  },
  {
    id: "2.2",
    title: "Подкатегория 2.2",
    parent: "2",
  },
];
