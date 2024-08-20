"use client";

import { Key, ReactNode, useState } from "react";
import { is } from "@/utils/type-guards";
import { CollapsedList } from "./collapsed-list";
import { ExpandedList } from "./expanded-list";

export interface TDefaultListOption {
  id: Key;
  label: ReactNode;
  title: string;
}

interface IProps<TOption extends TDefaultListOption> {
  options: TOption[];
  value?: TOption["id"][];
  onChange?: (value: TOption["id"][]) => void;
  collapseCount?: number;
  valueSorter?: (value: TOption["id"][]) => TOption["id"][];
}

export const ListFilter = <TOption extends TDefaultListOption>({
  options,
  value = [],
  onChange,
  collapseCount = 5,
  valueSorter,
}: IProps<TOption>) => {
  const [expanded, setExpanded] = useState(false);

  const handleCheckChange = (itemID: TOption["id"], checked: boolean) => {
    if (is.empty(onChange)) return;

    if (checked) {
      if (valueSorter) {
        onChange(valueSorter([...value, itemID]));
      } else {
        onChange([...value, itemID]);
      }
    } else {
      onChange(value.filter((id) => id !== itemID));
    }
  };

  const handleExpandClick = () => {
    setExpanded((prevValue) => !prevValue);
  };

  if (!expanded) {
    return (
      <CollapsedList
        options={options}
        value={value}
        count={collapseCount}
        onChange={handleCheckChange}
        onExpand={handleExpandClick}
      />
    );
  } else {
    return (
      <ExpandedList
        options={options}
        value={value}
        onChange={handleCheckChange}
        onCollapse={handleExpandClick}
      />
    );
  }
};
