"use client";

import { useMemo } from "react";
import { Form } from "antd";
import { useCatalogContext } from "../../context";
import { featuredFilters } from "../catalog-filters/featured-filters";
import { FilterTag } from "./filter-tag";

export const FilterTags = () => {
  const { filters, filtersValues, updateFilterValue, filtersForm } = useCatalogContext();

  const handleValuesChange = (changedValues: Record<string, string | string[] | undefined>) => {
    Object.entries(changedValues).forEach(([id, value]) => {
      updateFilterValue(id, value);
    });
  };

  const allEmpty = useMemo(() => {
    return Object.entries(filtersValues).length === 0;
  }, [filtersValues]);

  if (allEmpty) return null;

  return (
    <Form form={filtersForm} onValuesChange={handleValuesChange} className="flex">
      {featuredFilters.map((filter) => (
        <FilterTag key={filter.id} filter={filter} />
      ))}
      {filters.map((filter) => (
        <FilterTag key={filter.id} filter={filter} />
      ))}
    </Form>
  );
};
