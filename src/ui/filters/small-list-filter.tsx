"use client";

import { Key, ReactNode } from "react";
import { Checkbox } from "antd";
import { is } from "@/utils/type-guards";

export interface TDefaultListOption {
  id: Key;
  label: ReactNode;
}

interface IProps<TOption extends TDefaultListOption> {
  options: TOption[];
  value: TOption["id"][];
  onChange: (id: TOption["id"][]) => void;
}

export const SmallListFilter = <TOption extends TDefaultListOption>({
  options,
  value,
  onChange,
}: IProps<TOption>) => {
  const isChecked = (itemID: TOption["id"]) => {
    return value.some((id) => id === itemID);
  };

  const handleCheckChange = (itemID: TOption["id"], checked: boolean) => {
    if (is.empty(onChange)) return;

    if (checked) {
      onChange([...value, itemID]);
    } else {
      onChange(value.filter((id) => id !== itemID));
    }
  };

  return (
    <div className="w-full flex flex-wrap">
      {options.map((option) => (
        <Checkbox
          key={option.id}
          checked={isChecked(option.id)}
          onChange={(e) => handleCheckChange(option.id, e.target.checked)}
          className="!py-1 !pl-2 !pr-0 c-hover-bg rounded w-20"
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};
