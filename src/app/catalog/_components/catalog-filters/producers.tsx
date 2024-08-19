"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/client";
import { mockProducers } from "@/mock-data/producers";
import { FilterWithHeader } from "@/ui/filters/filter-with-header";
import { ListFilter } from "@/ui/filters/list-filter";
import { sortValuesByOptions } from "@/utils/array";

const getProducer = () => {
  return mockProducers;
};

export const Producers = () => {
  const { t } = useTranslation("catalog");

  const producers = getProducer();

  const options = useMemo(
    () =>
      producers.map((item) => ({
        id: item.id,
        label: item.title,
        title: item.title.toLocaleLowerCase(),
        weight: item.weight,
      })),
    [producers],
  );

  const [value, setValue] = useState<string[]>([]);

  const valueSorter = (newValue: string[]) => {
    return sortValuesByOptions(newValue, options, ["weight", "title"]);
  };

  const handleFilterChange = (newValue: string[]) => {
    setValue(newValue);
  };

  return (
    <FilterWithHeader title={t("filters.producer")}>
      <ListFilter
        options={options}
        value={value}
        onChange={handleFilterChange}
        valueSorter={valueSorter}
      />
    </FilterWithHeader>
  );
};
