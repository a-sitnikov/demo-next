"use client";

import { useEffect, useMemo } from "react";
import { Form } from "antd";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { IFilter, catalogActions } from "@/strore/slices";
import { is } from "@/utils/type-guards";
import { FilterTag } from "./filter-tag";

export const FilterTags = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.catalog.filters);

  const handleValuesChange = (
    changedValues: Record<IFilter["id"], IFilter["value"]>,
    allValues: Record<IFilter["id"], IFilter["value"]>,
  ) => {
    Object.entries(changedValues).forEach(([id, value]) => {
      dispatch(catalogActions.updateFilterValue({ id, value }));
    });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    filters.forEach((filter) => {
      form.setFieldValue(filter.id, filter.value);
    });
  }, [filters]);

  const allEmpty = useMemo(() => {
    return !filters.some((filter) => !is.empty(filter.value));
  }, [filters]);

  if (allEmpty) return null;

  return (
    <Form form={form} onValuesChange={handleValuesChange} className="flex">
      {filters.map((filter) => (
        <FilterTag filter={filter} />
      ))}
    </Form>
  );
};
