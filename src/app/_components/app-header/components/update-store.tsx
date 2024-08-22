"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/strore/hooks";
import { IBasketEntity, basketActions } from "@/strore/slices";

interface IProps {
  data: {
    basket: IBasketEntity[];
  };
}

export const UpdateStore: React.FC<IProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(basketActions.init({ entities: data.basket }));
  }, [dispatch, data.basket]);

  return null;
};
