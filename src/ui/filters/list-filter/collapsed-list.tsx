"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import { IFilterOption } from "@/api/catalog";
import { getCheckedOptions, getUncheckedOptions, toArray } from "@/utils/array";
import { ListRow } from "./list-row";

interface IProps<TOption extends IFilterOption> {
  options: TOption[];
  value: string | string[];
  count: number;
  onChange: (id: string, checked: boolean) => void;
  onExpand: () => void;
}

export const CollapsedList = <TOption extends IFilterOption>({
  options,
  value,
  count,
  onChange,
  onExpand,
}: IProps<TOption>) => {
  const { t } = useTranslation("common");

  const checkedOptions = useMemo(
    () => getCheckedOptions(options, toArray(value)),
    [options, value],
  );

  const uncheckeCount = count - checkedOptions.length;
  const uncheckedOptions = useMemo(
    () => getUncheckedOptions(options, toArray(value), uncheckeCount),
    [options, value, uncheckeCount],
  );

  return (
    <div className="flex flex-col">
      {checkedOptions.map((option) => (
        <ListRow key={option.id} item={option} checked={true} onChange={onChange} />
      ))}
      {uncheckedOptions.map((option) => (
        <ListRow key={option.id} item={option} checked={false} onChange={onChange} />
      ))}
      {options.length > count && (
        <div className="w-fit text-left p-2 pb-0 c-text-light cursor-pointer" onClick={onExpand}>
          {t("show_more")}
          <DownOutlined className="text-sm ml-2" />
        </div>
      )}
    </div>
  );
};
