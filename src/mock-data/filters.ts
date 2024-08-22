import { IFilter } from "@/app/api/catalog/route";
import { mockProducers } from "./producers";

export const mockFilters: IFilter[] = [
  {
    id: "producers",
    name: "Производитель",
    type: "List",
    options: mockProducers,
  },
  {
    id: "range_1",
    name: "Диапазон, А",
    type: "Range",
    min: 1,
    max: 10.5,
    unit: "A",
  },
  {
    id: "radio_2",
    name: "Радио",
    type: "Radio",
    options: [
      {
        id: "1",
        name: "Вариант 1",
      },
      {
        id: "2",
        name: "Вариант 2",
      },
      {
        id: "3",
        name: "Вариант 3",
      },
    ],
  },
  {
    id: "slist_3",
    name: "Короткий список",
    type: "SmallList",
    options: [
      {
        id: "1",
        name: "АВ1",
      },
      {
        id: "2",
        name: "АВ2",
      },
      {
        id: "3",
        name: "АВ3",
        disabled: true,
      },
      {
        id: "4",
        name: "АВ4",
      },
    ],
  },
];
