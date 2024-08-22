"use client";

import { useEffect } from "react";
import { Form } from "antd";
import { FilterWithHeader } from "@/ui/filters/filter-with-header";
import { useCatalogContext } from "../../context";
import { FeaturedFilters } from "./featured-filters";
import { FilterComponent } from "./filter-component";

export const CatalogFilters = () => {
  const { filters, filtersValues, updateFilterValue } = useCatalogContext();

  const handleValuesChange = (changedValues: Record<string, string | string[]>) => {
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

  return (
    <Form
      form={form}
      initialValues={filtersValues}
      onValuesChange={handleValuesChange}
      className="flex flex-col gap-4"
    >
      <FeaturedFilters />
      {filters.map((filter) => (
        <FilterWithHeader key={filter.id} title={filter.name}>
          <FilterComponent filter={filter} />
        </FilterWithHeader>
      ))}
    </Form>
  );
};
