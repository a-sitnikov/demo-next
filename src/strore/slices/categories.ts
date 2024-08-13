import { ICategory } from "@/api/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { StatusEnum } from "../types";
import { fetchCategories } from "@/api";
import { createAppAsyncThunk } from "../hooks";
import { is } from "@/utils/type-guards";

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
  reducers: {},
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
