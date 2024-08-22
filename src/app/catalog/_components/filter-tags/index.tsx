"use client";

import { useEffect, useMemo } from "react";
import { Form } from "antd";
import { useCatalogContext } from "../../context";
import { featuredFilters } from "../catalog-filters/featured-filters";
import { FilterTag } from "./filter-tag";

export const FilterTags = () => {
  const { filters, filtersValues, updateFilterValue } = useCatalogContext();

  const handleValuesChange = (changedValues: Record<string, string | string[] | undefined>) => {
    Object.entries(changedValues).forEach(([id, value]) => {
      updateFilterValue(id, value);
    });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    filters.forEach((filter) => {
      const value = filtersValues[filter.id];
      form.setFieldValue(filter.id, value);
    });
  }, [filters, filtersValues, form]);

  const allEmpty = useMemo(() => {
    return Object.entries(filtersValues).length === 0;
  }, [filtersValues]);

  if (allEmpty) return null;

  return (
    <Form form={form} onValuesChange={handleValuesChange} className="flex">
      {featuredFilters.map((filter) => (
        <FilterTag key={filter.id} filter={filter} />
      ))}
      {filters.map((filter) => (
        <FilterTag key={filter.id} filter={filter} />
      ))}
    </Form>
  );
};
