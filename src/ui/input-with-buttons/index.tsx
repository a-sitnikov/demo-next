"use client";

import { IItem } from "@/api/types";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { basketActions } from "@/strore/slices";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Compact from "antd/es/space/Compact";

interface IProps {
  value: number;
  onChange: (value: number) => void;
}

export const InputWithButtons: React.FC<IProps> = ({ value, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const qty = event.target.value === "" ? 0 : parseInt(event.target.value);
    if (isNaN(qty)) return;

    onChange(qty);
  };

  const handleDecrease = () => {
    if (value === 0) return;
    onChange(value - 1);
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <Compact>
      <Button onClick={handleDecrease}>
        <MinusOutlined />
      </Button>
      <Input
        className="text-center"
        min={0}
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
      />
      <Button onClick={handleIncrease}>
        <PlusOutlined />
      </Button>
    </Compact>
  );
};
