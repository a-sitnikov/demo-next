import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "@/api";
import { ICategory } from "@/api/types";
import { is } from "@/utils/type-guards";
import { createAppAsyncThunk } from "../hooks";
import { StatusEnum } from "../types";

export interface CategoriesState {
  status: StatusEnum;
  error?: string;
  items: ICategory[];
}

const initialState: CategoriesState = {
  status: StatusEnum.Init,
  items: [],
};

export const getCategories = createAppAsyncThunk("categories/get", async () => {
  return fetchCategories();
});

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    init: (
      state,
      { payload: { items } }: PayloadAction<{ items: ICategory[] }>,
    ) => {
      state.items = items;
      state.status = StatusEnum.Success;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.status = StatusEnum.Loading;
        state.error = undefined;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        if (!is.empty(payload)) {
          state.items = payload;
        }
      })
      .addCase(getCategories.rejected, (state, { error }) => {
        state.status = StatusEnum.Error;
        state.error = error.message;
      });
  },
});

export const { actions: categoriesActions, reducer: categories } = slice;
