"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";
import { useDebounceCallback, useEventCallback } from "usehooks-ts";
import { ICategory } from "@/api/types";
import { is } from "@/utils/type-guards";
import { IAPICatalogData, IFilter, IFilterProps, IItem } from "../api/catalog/route";

interface ICatalogContext {
  filters: IFilter[];
  setFilters: React.Dispatch<React.SetStateAction<IFilter[]>>;
  updateFilterValue: (id: string, value: IFilterProps["value"]) => void;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  categories: ICategory[];
  loading: boolean;
}

interface IProps extends React.PropsWithChildren {
  initialData: IAPICatalogData;
}

const CatalogContext = createContext<ICatalogContext>({} as ICatalogContext);
export const useCatalogContext = () => useContext(CatalogContext);

export const CatalogContextProvider: React.FC<IProps> = ({ initialData, children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<IFilter[]>(initialData.filters);

  const updateURLandData = useEventCallback(() => {
    const params = new URLSearchParams();

    const search = searchParams.get("search");
    if (!is.empty(search)) {
      params.set("search", search);
    }

    filters.forEach((filter) => {
      if (is.empty(filter.value)) return;
      params.set(`f_${filter.id}`, filter.value.toString());
    });

    router.push(`/catalog/?${params.toString()}`, { scroll: false });

    setLoading(true);
    fetch(`/api/catalog?${params.toString()}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data: IAPICatalogData) => setItems(data.items))
      .catch(console.log)
      .finally(() => setLoading(false));
  });

  const updateURLandDataDebounced = useDebounceCallback(updateURLandData, 300);

  const updateFilterValue = useEventCallback((id: string, value: IFilterProps["value"]) => {
    setFilters(
      (prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === id ? { ...filter, value } : filter,
        ) as IFilter[],
    );

    updateURLandDataDebounced();
  });

  const [items, setItems] = useState<IItem[]>(initialData.items);
  const [categories, setCategories] = useState<ICategory[]>(initialData.categories);

  const contextValue = useMemo<ICatalogContext>(
    () => ({
      filters,
      setFilters,
      updateFilterValue,
      items,
      setItems,
      categories,
      loading,
    }),
    [filters, items, updateFilterValue, categories, loading],
  );

  return <CatalogContext.Provider value={contextValue}>{children}</CatalogContext.Provider>;
};
