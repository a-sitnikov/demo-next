"use client";

import { useState } from "react";
import { FilterWithHeader } from "@/ui/filters/filter-with-header";
import { RadioFilter } from "@/ui/filters/radio-filter";
import { RangeFilter } from "@/ui/filters/range-filter";
import { SmallListFilter } from "@/ui/filters/small-list-filter";
import { Producers } from "./producers";

const radioOptions = [
  {
    id: 1,
    label: "Вариант 1",
  },
  {
    id: 2,
    label: "Вариант 2",
  },
  {
    id: 3,
    label: "Вариант 3",
  },
];

const smallListOptions = [
  {
    id: 1,
    label: "АВ1",
  },
  {
    id: 2,
    label: "АВ2",
  },
  {
    id: 3,
    label: "АВ3",
  },
  {
    id: 4,
    label: "АВ4",
  },
];

export const CatalogFilters = () => {
  const [range, setRange] = useState<[string | undefined, string | undefined]>([undefined, "8.5"]);

  const [radio, setRadio] = useState<number>(2);
  const [smallList, setSmallList] = useState<number[]>([1, 3]);

  return (
    <>
      <Producers />
      <FilterWithHeader title="Диапазон">
        <RangeFilter value={range} onChange={setRange} min={1} max={10.5} />
      </FilterWithHeader>
      <FilterWithHeader title="Радио">
        <RadioFilter options={radioOptions} value={radio} onChange={setRadio} />
      </FilterWithHeader>
      <FilterWithHeader title="Короткий список">
        <SmallListFilter options={smallListOptions} value={smallList} onChange={setSmallList} />
      </FilterWithHeader>
    </>
  );
};
