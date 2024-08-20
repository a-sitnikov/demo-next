"use client";

import { useMemo } from "react";
import { useTranslation } from "@/i18n/client";
import { useAppDispatch } from "@/strore/hooks";
import { FilterType, IFilter, catalogActions } from "@/strore/slices";
import { DropdownTag } from "@/ui/dropdown-tag";
import { FilterWithHeader } from "@/ui/filters/filter-with-header";
import { is } from "@/utils/type-guards";
import { FilterComponent } from "../catalog-filters/filter-component";

interface IProps {
  filter: IFilter;
}

export const FilterTag: React.FC<IProps> = ({ filter }) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const title = useMemo(() => {
    if (is.undefined(filter.value)) return null;

    switch (filter.type) {
      case FilterType.List:
      case FilterType.SmallList:
        const value0 = filter.value[0];
        return filter.options.find((item) => item.id === value0)?.label;
      case FilterType.Radio:
        return filter.options.find((item) => item.id === filter.value)?.label;
      case FilterType.Range:
        const [min, max] = filter.value;
        if (is.empty(min)) {
          return `${filter.name}: ${t("range.to")} ${max}`;
        } else if (is.empty(max)) {
          return `${filter.name}: ${t("range.from")} ${min}`;
        } else {
          return `${filter.name}: ${min} - ${max}`;
        }
      default:
        return null;
    }
  }, [filter]);

  const subtitle = useMemo(() => {
    if (is.undefined(filter.value)) return null;

    switch (filter.type) {
      case FilterType.List:
      case FilterType.SmallList:
        const count = filter.value.length - 1;
        return count === 0 ? null : `+${count}`;
      default:
        return null;
    }
  }, [filter]);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(catalogActions.updateFilterValue({ id: filter.id, value: undefined }));
  };

  if (is.empty(filter.value)) return null;

  return (
    <DropdownTag
      title={title}
      subtitle={subtitle}
      onClose={handleClose}
      dropdown={
        <FilterWithHeader key={filter.id} title={filter.name}>
          <FilterComponent filter={filter} />
        </FilterWithHeader>
      }
    />
  );
};
