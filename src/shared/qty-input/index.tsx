"use client";

import { IItem } from "@/api/types";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { basketActions } from "@/strore/slices";
import { InputWithButtons } from "@/ui/input-with-buttons";
import { is } from "@/utils/type-guards";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Compact from "antd/es/space/Compact";

interface IProps {
  item: IItem;
}

export const QtyInput: React.FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => {
    const basketEntity = state.basket.entities.find(
      (entity) => entity.item.id === item.id
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

  return <InputWithButtons value={value} onChange={handleChange} />;
};
