"use client";

import { IItem } from "@/api/types";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { basketActions } from "@/strore/slices";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Compact from "antd/es/space/Compact";

interface IProps {
  item: IItem;
}

export const QtyInput: React.FC<IProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const qtyMap = useAppSelector((state) => state.basket.qtyMap);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const qty = event.target.value === "" ? 0 : parseInt(event.target.value);
    if (isNaN(qty)) return;

    dispatch(basketActions.update({ item, qty }));
  };

  return (
    <Compact>
      <Button
        onClick={() => {
          dispatch(basketActions.decrease({ item }));
        }}
      >
        <MinusOutlined />
      </Button>
      <Input
        className="text-center"
        min={0}
        pattern="[0-9]*"
        value={qtyMap.get(item.id)}
        onChange={handleChange}
      />
      <Button
        onClick={() => {
          dispatch(basketActions.increase({ item }));
        }}
      >
        <PlusOutlined />
      </Button>
    </Compact>
  );
};
