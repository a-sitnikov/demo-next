"use client";

import { useMemo } from "react";
import { IFilter } from "@/api/catalog";
import { useTranslation } from "@/i18n/client";
import { BlockWithHeader } from "@/ui/block-with-header";
import { DropdownTag } from "@/ui/dropdown-tag";
import { is } from "@/utils/type-guards";
import { useCatalogContext } from "../../context";
import { FilterComponent } from "../catalog-filters/filter-component";

interface IProps {
  filter: IFilter;
}

export const FilterTag: React.FC<IProps> = ({ filter }) => {
  const { t } = useTranslation("common");
  const { t: t_cat } = useTranslation("catalog");
  const { filtersValues, updateFilterValue } = useCatalogContext();

  const value = filtersValues[filter.id];

  const title = useMemo(() => {
    if (is.undefined(value)) return null;

    switch (filter.type) {
      case "List":
      case "SmallList":
        const value0 = value[0];
        return filter.options.find((item) => item.id === value0)?.name;
      case "Radio":
        return filter.options.find((item) => item.id === value)?.name;
      case "Range":
        if (!is.array(value)) return null;

        const [min, max] = value;
        let name = "";

        if (is.empty(min)) {
          name = `${t("range.to")} ${max}`;
        } else if (is.empty(max)) {
          name = `${t("range.from")} ${min}`;
        } else {
          name = `${min} - ${max}`;
        }

        if (!is.empty(filter.unit)) {
          name += " " + filter.unit;
        }

        return name;

      case "Bool":
        return t_cat(filter.name || "");
      default:
        return null;
    }
  }, [filter, value, t, t_cat]);

  const subtitle = useMemo(() => {
    if (is.undefined(value)) return null;

    switch (filter.type) {
      case "List":
      case "SmallList":
        const count = value.length - 1;
        return count === 0 ? null : `+${count}`;
      default:
        return null;
    }
  }, [filter, value]);

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    updateFilterValue(filter.id, undefined);
  };

  if (is.empty(value)) return null;

  return (
    <DropdownTag
      title={title}
      subtitle={subtitle}
      onClose={handleClose}
      dropdown={
        filter.type === "Bool" ? undefined : (
          <BlockWithHeader key={filter.id} title={filter.name}>
            <FilterComponent filter={filter} />
          </BlockWithHeader>
        )
      }
    />
  );
};
