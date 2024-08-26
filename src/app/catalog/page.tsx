import { Metadata } from "next";
import { fetchCatalog } from "@/api/catalog";
import { useServerTranslation } from "@/i18n";
import { objectToSearchParams } from "@/utils/filters";
import { Banner } from "./_components/banner";
import { CatalogFilters } from "./_components/catalog-filters";
import { CatalogTable } from "./_components/catalog-table";
import { CategoryTree } from "./_components/category-tree";
import { FilterTags } from "./_components/filter-tags";
import { SearchInfo } from "./_components/search-info";
import { Shortcuts } from "./_components/shortcuts";
import { CatalogContextProvider } from "./context";

export const metadata: Metadata = {
  title: "Каталог",
};

async function getData(searchParams?: {}) {
  return fetchCatalog(searchParams);
}

interface IProps {
  searchParams?: {
    search?: string;
  };
}

export default async function Catalog({ searchParams }: IProps) {
  const data = await getData(searchParams);

  return (
    <CatalogContextProvider initialData={data} searchParams={searchParams}>
      <div className="flex flex-col gap-4 px-2">
        <Shortcuts />
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 shrink-0 grow-0 w-60">
            <CategoryTree />
            <CatalogFilters />
          </div>
          <div className="flex flex-col gap-2 grow shrink w-0">
            <Banner />
            <SearchInfo text={searchParams?.search} count={data.count} />
            <FilterTags />
            <CatalogTable />
          </div>
        </div>
      </div>
    </CatalogContextProvider>
  );
}
