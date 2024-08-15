import { IItem } from "@/api/types";
import { calculateSum } from "@/utils/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBasketEntity {
  item: IItem;
  qty: number;
  sum: number;
}
export interface BasketState {
  total: number;
  entities: IBasketEntity[];
}

const initialState: BasketState = {
  total: 0,
  entities: [],
};

const calculateTotal = (state: BasketState) => {
  let total = 0;
  state.entities.forEach((item) => {
    total += item.sum;
  });

  state.total = Math.round(100 * total) / 100;
};

const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    init: (
      state,
      { payload: { entities } }: PayloadAction<{ entities: IBasketEntity[] }>
    ) => {
      state.entities = entities;
      calculateTotal(state);
    },
    upsertItem: (
      state,
      { payload: { item, qty } }: PayloadAction<{ item: IItem; qty: number }>
    ) => {
      const index = state.entities.findIndex(
        (entity) => entity.item.id === item.id
      );

      if (qty === 0) {
        if (index !== -1) state.entities.splice(index, 1);
      } else {
        if (index === -1) {
          state.entities.push({
            item,
            qty,
            sum: calculateSum(item.price, qty),
          });
        } else {
          state.entities[index].qty = qty;
          state.entities[index].sum = calculateSum(item.price, qty);
        }
      }
      calculateTotal(state);
    },
  },
});

export const { actions: basketActions, reducer: basket } = slice;
