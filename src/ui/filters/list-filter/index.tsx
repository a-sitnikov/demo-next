"use client";

import { useState } from "react";
import { IFilterOption } from "@/app/api/catalog/route";
import { sortValuesByOptions, toArray } from "@/utils/array";
import { is } from "@/utils/type-guards";
import { CollapsedList } from "./collapsed-list";
import { ExpandedList } from "./expanded-list";

interface IProps<TOption extends IFilterOption> {
  options: TOption[];
  value?: string | string[];
  onChange?: (value: string[]) => void;
  collapseCount?: number;
}

export const ListFilter = <TOption extends IFilterOption>({
  options,
  value = [],
  onChange,
  collapseCount = 5,
}: IProps<TOption>) => {
  const [expanded, setExpanded] = useState(false);

  const valueSorter = (newValue: string[]) => {
    return sortValuesByOptions(newValue, options, ["weight", "name"]);
  };

  const handleCheckChange = (itemID: string, checked: boolean) => {
    if (is.empty(onChange)) return;

    if (checked) {
      onChange(valueSorter([...toArray(value), itemID]));
    } else {
      onChange(toArray(value).filter((id) => id !== itemID));
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
