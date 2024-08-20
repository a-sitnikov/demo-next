import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Key } from "react";
import { ICategory } from "@/api/types";
import { IItem } from "@/app/api/catalog/route";
import { mockProducers } from "@/mock-data/producers";
import { TDefaultListOption } from "@/ui/filters/list-filter";
import { TDefaultRadioOption } from "@/ui/filters/radio-filter";
import { TDefaultSmallListOption } from "@/ui/filters/small-list-filter";
import { is } from "@/utils/type-guards";

export enum FilterType {
  List,
  SmallList,
  Range,
  Radio,
}

interface IRangeFilter {
  min?: number;
  max?: number;
  value?: [string | undefined, string | undefined];
}

interface IListFilter {
  options: TDefaultListOption[];
  value?: Key[];
}

interface ISmallListFilter {
  options: TDefaultSmallListOption[];
  value?: Key[];
}

interface IRadioFilter {
  options: TDefaultRadioOption[];
  value?: Key;
}

type IFilterProps = IListFilter | IRadioFilter | IRangeFilter;

export type IFilter = {
  id: string;
  name: string;
} & (
  | ({
      type: FilterType.List;
    } & IListFilter)
  | ({
      type: FilterType.SmallList;
    } & ISmallListFilter)
  | ({
      type: FilterType.Radio;
    } & IRadioFilter)
  | ({
      type: FilterType.Range;
    } & IRangeFilter)
);

export interface CatalogState {
  items: IItem[];
  producers?: IListFilter;
  filters: IFilter[];
  categories: ICategory[];
}

const initialFilters: IFilter[] = [
  {
    id: "producers",
    name: "Производитель",
    type: FilterType.List,
    options: mockProducers.map((item) => ({
      id: item.id,
      title: item.title.toLocaleLowerCase(),
      label: item.title,
    })),
  },
  {
    id: "1",
    name: "Диапазон",
    type: FilterType.Range,
    min: 1,
    max: 10.5,
    value: [undefined, "8"],
  },
  {
    id: "2",
    name: "Радио",
    type: FilterType.Radio,
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
    type: FilterType.SmallList,
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

const initialState: CatalogState = {
  items: [],
  filters: initialFilters,
  categories: [],
};

const slice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    init: (state, { payload: { items, filters, categories } }: PayloadAction<CatalogState>) => {
      state.items = items;
      state.filters = filters;
      state.categories = categories;
    },
    updateFilterValue: (
      state,
      { payload: { id, value } }: PayloadAction<{ id: string; value: IFilterProps["value"] }>,
    ) => {
      const filter = state.filters.find((item) => item.id === id);
      if (is.empty(filter)) return;

      filter.value = value;
    },
  },
});

export const { actions: catalogActions, reducer: catalog } = slice;
