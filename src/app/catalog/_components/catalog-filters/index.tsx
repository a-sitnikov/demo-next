"use client";

import { useEffect, useMemo } from "react";
import { Form } from "antd";
import { IFilter } from "@/app/api/catalog/route";
import { FilterWithHeader } from "@/ui/filters/filter-with-header";
import { useCatalogContext } from "../../context";
import { FilterComponent } from "./filter-component";

export const CatalogFilters = () => {
  const { filters, updateFilterValue } = useCatalogContext();

  const handleValuesChange = (
    changedValues: Record<IFilter["id"], IFilter["value"]>,
    allValues: Record<IFilter["id"], IFilter["value"]>,
  ) => {
    Object.entries(changedValues).forEach(([id, value]) => {
      updateFilterValue(id, value);
    });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    filters.forEach((filter) => {
      form.setFieldValue(filter.id, filter.value);
    });
  }, [filters, form]);

  const initialValues = useMemo(() => {
    const values: Record<string, any> = {};
    filters.forEach((filter) => (values[filter.id] = filter.value));

    return values;
  }, [filters]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onValuesChange={handleValuesChange}
      className="flex flex-col gap-4"
    >
      {filters.map((filter) => (
        <FilterWithHeader key={filter.id} title={filter.name}>
          <FilterComponent filter={filter} />
        </FilterWithHeader>
      ))}
    </Form>
  );
};
