"use client";

import { Key, ReactNode } from "react";
import { Checkbox } from "antd";
import { toArray } from "@/utils/array";
import { is } from "@/utils/type-guards";

export interface TDefaultSmallListOption {
  id?: Key;
  name: ReactNode;
  disabled?: boolean;
}

interface IProps<TOption extends TDefaultSmallListOption> {
  options: TOption[];
  value?: TOption["id"] | TOption["id"][];
  onChange?: (id: TOption["id"][]) => void;
}

export const SmallListFilter = <TOption extends TDefaultSmallListOption>({
  options,
  value = [],
  onChange,
}: IProps<TOption>) => {
  const isChecked = (itemID: TOption["id"]) => {
    return toArray(value).some((id) => id === itemID);
  };

  const handleCheckChange = (itemID: TOption["id"], checked: boolean) => {
    if (is.empty(onChange)) return;

    if (checked) {
      onChange([...toArray(value), itemID]);
    } else {
      onChange(toArray(value).filter((id) => id !== itemID));
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
          disabled={option.disabled}
        >
          {option.name}
        </Checkbox>
      ))}
    </div>
  );
};
