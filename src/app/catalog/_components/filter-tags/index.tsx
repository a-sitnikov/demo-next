"use client";

import { useEffect, useMemo } from "react";
import { Form } from "antd";
import { IFilter } from "@/app/api/catalog/route";
import { is } from "@/utils/type-guards";
import { useCatalogContext } from "../../context";
import { FilterTag } from "./filter-tag";

export const FilterTags = () => {
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

  const allEmpty = useMemo(() => {
    return !filters.some((filter) => !is.empty(filter.value));
  }, [filters]);

  if (allEmpty) return null;

  return (
    <Form form={form} onValuesChange={handleValuesChange} className="flex">
      {filters.map((filter) => (
        <FilterTag key={filter.id} filter={filter} />
      ))}
    </Form>
  );
};
