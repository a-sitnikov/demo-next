"use client";

import { useMemo, useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "@/i18n/client";
import { mockProducers } from "@/mock-data/producers";
import { FilterWithHeader } from "@/ui/filters/filter-with-header";
import { ListFilter } from "@/ui/filters/list-filter";
import { sortValuesByOptions } from "@/utils/array";

const getProducer = () => {
  return mockProducers;
};

export const Producers = () => {
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

  const valueSorter = (newValue: string[]) => {
    return sortValuesByOptions(newValue, options, ["weight", "title"]);
  };

  return (
    <FormItem name="producers" noStyle>
      <ListFilter options={options} valueSorter={valueSorter} />
    </FormItem>
  );
};
