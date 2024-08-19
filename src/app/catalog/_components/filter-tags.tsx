import { FilterTag } from "@/ui/filters/filter-tag";
import { Producers } from "./catalog-filters/producers";

export const FilterTags = () => {
  return (
    <div className="flex gap-4">
      <FilterTag title={"ABL SURSUM"} count={4} filter={<Producers />} />
    </div>
  );
};
