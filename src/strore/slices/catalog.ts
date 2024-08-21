import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICategory } from "@/api/types";
import { IFilter, IFilterProps, IItem, IListFilter } from "@/app/api/catalog/route";
import { is } from "@/utils/type-guards";

export interface CatalogState {
  items: IItem[];
  producers?: IListFilter;
  filters: IFilter[];
  categories: ICategory[];
}

const initialState: CatalogState = {
  items: [],
  filters: [],
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
