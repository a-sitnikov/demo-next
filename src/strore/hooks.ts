import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
