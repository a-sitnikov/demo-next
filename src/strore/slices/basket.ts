import { IItem } from "@/api/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface BasketState {
  sum: number;
  items: IItem[];
  qtyMap: Map<string, number>;
}

const initialState: BasketState = {
  sum: 0,
  items: [],
  qtyMap: new Map(),
};

const calculateSum = (state: BasketState) => {
  let sum = 0;
  state.items.forEach((item) => {
    sum += item.price * (state.qtyMap.get(item.id) ?? 0);
  });

  state.sum = Math.round(100 * sum) / 100;
};

const addItem = (state: BasketState, item: IItem, qty: number) => {
  const index = state.items.findIndex((_item) => _item.id === item.id);
  if (index === -1) state.items.push(item);
  state.qtyMap.set(item.id, qty);
};

const deleteItem = (state: BasketState, item: IItem) => {
  const index = state.items.findIndex((_item) => _item.id === item.id);
  if (index !== -1) state.items.splice(index, 1);
  state.qtyMap.delete(item.id);
};

const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    update: (
      state,
      { payload: { item, qty } }: PayloadAction<{ item: IItem; qty: number }>
    ) => {
      const index = state.items.findIndex((_item) => _item.id === item.id);
      if (qty === 0) {
        deleteItem(state, item);
      } else {
        addItem(state, item, qty);
      }
      calculateSum(state);
    },
    deleteItem: (
      state,
      { payload: { item } }: PayloadAction<{ item: IItem }>
    ) => {
      deleteItem(state, item);
      calculateSum(state);
    },
    increase: (
      state,
      { payload: { item } }: PayloadAction<{ item: IItem }>
    ) => {
      const qty = state.qtyMap.get(item.id) || 0;
      addItem(state, item, qty + 1);
      calculateSum(state);
    },
    decrease: (
      state,
      { payload: { item } }: PayloadAction<{ item: IItem }>
    ) => {
      const qty = state.qtyMap.get(item.id) || 0;
      if (qty === 0) return;

      if (qty === 1) {
        deleteItem(state, item);
      } else {
        addItem(state, item, qty - 1);
      }
      calculateSum(state);
    },
  },
});

export const { actions: basketActions, reducer: basket } = slice;
