"use client";

import { useEffect } from "react";
import { Form } from "antd";
import { BlockWithHeader } from "@/ui/block-with-header";
import { useCatalogContext } from "../../context";
import { FeaturedFilters, featuredFilters } from "./featured-filters";
import { FilterComponent } from "./filter-component";

export const CatalogFilters = () => {
  const { filters, filtersValues, updateFilterValue, filtersForm } = useCatalogContext();

  const handleValuesChange = (changedValues: Record<string, string | string[]>) => {
    Object.entries(changedValues).forEach(([id, value]) => {
      updateFilterValue(id, value);
    });
  };

  return (
    <Form
      form={filtersForm}
      initialValues={filtersValues}
      onValuesChange={handleValuesChange}
      className="flex flex-col gap-4"
    >
      <FeaturedFilters />
      {filters.map((filter) => (
        <BlockWithHeader key={filter.id} title={filter.name}>
          <FilterComponent filter={filter} />
        </BlockWithHeader>
      ))}
    </Form>
  );
};
