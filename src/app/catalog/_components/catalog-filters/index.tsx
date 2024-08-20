"use client";

import { useEffect, useMemo } from "react";
import { Form } from "antd";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { IFilter, catalogActions } from "@/strore/slices";
import { FilterWithHeader } from "@/ui/filters/filter-with-header";
import { FilterComponent } from "./filter-component";
import { Producers } from "./producers";

export const CatalogFilters = () => {
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

  const initialValues = useMemo(() => {
    const values: Record<string, any> = {};
    filters.forEach((filter) => (values[filter.id] = filter.value));

    return values;
  }, []);

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
