import { IFilter } from "@/app/api/catalog/route";
import { mockProducers } from "./producers";

export const mockFilters: IFilter[] = [
  {
    id: "producers",
    name: "Производитель",
    type: "List",
    options: mockProducers.map((item) => ({
      id: item.id,
      title: item.title.toLocaleLowerCase(),
      label: item.title,
    })),
  },
  {
    id: "1",
    name: "Диапазон",
    type: "Range",
    min: 1,
    max: 10.5,
    value: [undefined, "8"],
  },
  {
    id: "2",
    name: "Радио",
    type: "Radio",
    options: [
      {
        id: 1,
        label: "Вариант 1",
      },
      {
        id: 2,
        label: "Вариант 2",
      },
      {
        id: 3,
        label: "Вариант 3",
      },
      {
        id: undefined,
        label: "Любой",
      },
    ],
    value: 2,
  },
  {
    id: "3",
    name: "Короткий список",
    type: "SmallList",
    options: [
      {
        id: 1,
        label: "АВ1",
      },
      {
        id: 2,
        label: "АВ2",
      },
      {
        id: 3,
        label: "АВ3",
        disabled: true,
      },
      {
        id: 4,
        label: "АВ4",
      },
    ],
    value: [1, 4],
  },
];
