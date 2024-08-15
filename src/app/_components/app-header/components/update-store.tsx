"use client";

import { useEffect } from "react";
import { ICategory } from "@/api/types";
import { useAppDispatch } from "@/strore/hooks";
import {
  IBasketEntity,
  basketActions,
  categoriesActions,
} from "@/strore/slices";

interface IProps {
  data: {
    basket: IBasketEntity[];
    categories: ICategory[];
  };
}

export const UpdateStore: React.FC<IProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(basketActions.init({ entities: data.basket }));
    dispatch(categoriesActions.init({ items: data.categories }));
  }, [dispatch, data.basket, data.categories]);

  return null;
};
