"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getCheckedOptions, getUncheckedOptions } from "@/utils/array";
import { TDefaultListOption } from ".";

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
        <Checkbox
          key={option.id}
          checked={true}
          onChange={(e) => onChange(option.id, e.target.checked)}
          className="!py-1 !pl-2 !pr-0 hover-bg rounded"
        >
          {option.label}
        </Checkbox>
      ))}
      {uncheckedOptions.map((option) => (
        <Checkbox
          key={option.id}
          checked={false}
          onChange={(e) => onChange(option.id, e.target.checked)}
          className="!py-1 !pl-2 !pr-0 hover-bg rounded"
        >
          {option.label}
        </Checkbox>
      ))}
      <button className="w-fit text-left p-2 text-neutral-400 cursor-pointer" onClick={onExpand}>
        {t("show_more")}
        <DownOutlined className="text-sm ml-2" />
      </button>
    </div>
  );
};
