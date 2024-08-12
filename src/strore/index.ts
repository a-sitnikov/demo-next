import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { basket } from "./slices/";

enableMapSet();

export const reducer = combineReducers({
  basket,
});

export const makeStore = () => {
  return configureStore({
    reducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
