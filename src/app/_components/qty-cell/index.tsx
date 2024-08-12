"use client";

import { IItem } from "@/api/types";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { basketActions } from "@/strore/slices";
import { Input } from "antd";

interface IProps {
  item: IItem;
}

export const QtyCell: React.FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const qtyMap = useAppSelector((state) => state.basket.qtyMap);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const qty = parseInt(event.target.value);
    dispatch(basketActions.addToBasket({ item, qty }));
  };

  return (
    <Input
      min={0}
      type="number"
      value={qtyMap.get(item.id)}
      onChange={handleChange}
    />
  );
};
