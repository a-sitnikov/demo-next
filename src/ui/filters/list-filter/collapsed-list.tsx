"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import { getCheckedOptions, getUncheckedOptions } from "@/utils/array";
import { TDefaultListOption } from ".";
import { ListRow } from "./list-row";

interface IProps<TOption extends TDefaultListOption> {
  options: TOption[];
  value: TOption["id"][];
  count: number;
  onChange: (id: TOption["id"], checked: boolean) => void;
  onExpand: () => void;
}

export const CollapsedList = <TOption extends TDefaultListOption>({
  options,
  value,
  count,
  onChange,
  onExpand,
}: IProps<TOption>) => {
  const { t } = useTranslation("common");

  const checkedOptions = useMemo(() => getCheckedOptions(options, value), [options, value]);
  const uncheckedOptions = useMemo(
    () => getUncheckedOptions(options, value, count - value.length),
    [options, value, count],
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
