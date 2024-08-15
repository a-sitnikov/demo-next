"use client";

import { IItem } from "@/api/types";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { basketActions } from "@/strore/slices";
import { InputPlusMinus } from "@/ui/input-plus-minus";
import { is } from "@/utils/type-guards";

interface IProps {
  item: IItem;
}

export const QtyInput: React.FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => {
    const basketEntity = state.basket.entities.find(
      (entity) => entity.item.id === item.id,
    );
    if (is.empty(basketEntity)) {
      return 0;
    } else {
      return basketEntity.qty;
    }
  });

  const handleChange = (qty: number) => {
    dispatch(basketActions.upsertItem({ item, qty }));
  };

  return <InputPlusMinus value={value} onChange={handleChange} />;
};
