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

const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (
      state,
      { payload: { item, qty } }: PayloadAction<{ item: IItem; qty: number }>
    ) => {
      const index = state.items.findIndex((_item) => _item.id === item.id);
      if (qty === 0) {
        if (index !== -1) state.items.splice(index, 1);
        state.qtyMap.delete(item.id);
      } else {
        if (index === -1) state.items.push(item);
        state.qtyMap.set(item.id, qty);
      }
      calculateSum(state);
    },
  },
});

export const { actions: basketActions, reducer: basket } = slice;
