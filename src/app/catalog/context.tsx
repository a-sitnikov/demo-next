"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import { useDebounceCallback, useEventCallback } from "usehooks-ts";
import { Form, FormInstance } from "antd";
import { IAPICatalogData, ICategory, IFilter, IItem } from "@/api/catalog";
import { upadetSearchParams } from "@/utils/filters";
import { useLoading, useYandexMetrika } from "@/utils/hooks";
import { is } from "@/utils/type-guards";

export interface ICatalogContext {
  filters: IFilter[];
  setFilters: React.Dispatch<React.SetStateAction<IFilter[]>>;
  filtersValues: Record<string, string | string[]>;
  updateFilterValue: (id: string, value: string | string[] | undefined) => void;
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  categories: ICategory[];
  loading: boolean;
  filtersForm: FormInstance;
}

interface IProps extends React.PropsWithChildren {
  initialData: IAPICatalogData;
  searchParams?: {
    search?: string;
  };
}

const CatalogContext = createContext<ICatalogContext>({} as ICatalogContext);
export const useCatalogContext = () => useContext(CatalogContext);

export const CatalogContextProvider: React.FC<IProps> = ({
  initialData,
  searchParams,
  children,
}) => {
  useYandexMetrika();

  const router = useRouter();

  const { loading, startLoading, finishLoading } = useLoading();

  const [filters, setFilters] = useState<ICatalogContext["filters"]>(() => [
    ...initialData.filters,
  ]);
  const [filtersValues, setFiltersValues] = useState<ICatalogContext["filtersValues"]>(
    initialData.filtersValues,
  );

  const [filtersForm] = Form.useForm();

  const abortControllerRef = useRef(new AbortController());

  const updateURLandData = useEventCallback(() => {
    const params = new URLSearchParams();

    const search = searchParams?.search;
    if (!is.empty(search)) {
      params.set("search", search);
    }

    upadetSearchParams(params, filtersValues);

    router.push(`/catalog/?${params.toString()}`, { scroll: false });

    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    startLoading();
    fetch(`/api/catalog?${params.toString()}`, { signal: abortControllerRef.current.signal })
      .then((response) => response.json())
      .then((data: IAPICatalogData) => {
        setFilters(data.filters);
        setItems(data.items);
        setCategories(data.categories);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        console.log(e);
      })
      .finally(finishLoading);
  });

  const updateURLandDataDebounced = useDebounceCallback(updateURLandData, 300);

  const updateFilterValue: ICatalogContext["updateFilterValue"] = useEventCallback((id, value) => {
    setFiltersValues((prevValue) => {
      const newValue = Object.assign({}, prevValue);

      if (is.undefined(value)) {
        delete newValue[id];
      } else {
        newValue[id] = value;
      }

      return newValue;
    });

    updateURLandDataDebounced();
  });

  const [items, setItems] = useState<IItem[]>(initialData.items);
  const [categories, setCategories] = useState<ICategory[]>(initialData.categories);

  const contextValue = useMemo<ICatalogContext>(
    () => ({
      filters,
      setFilters,
      filtersValues,
      updateFilterValue,
      items,
      setItems,
      categories,
      loading,
      filtersForm,
    }),
    [filters, items, filtersValues, updateFilterValue, categories, loading, filtersForm],
  );

  return <CatalogContext.Provider value={contextValue}>{children}</CatalogContext.Provider>;
};
