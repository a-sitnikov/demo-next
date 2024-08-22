"use client";

import { Key, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioChangeEvent, Space } from "antd";
import Compact from "antd/es/space/Compact";
import { is } from "@/utils/type-guards";

export interface TDefaultRadioOption {
  id?: Key;
  name: ReactNode;
}

interface IProps<TOption extends TDefaultRadioOption> {
  options: TOption[];
  value?: TOption["id"];
  onChange?: (value: TOption["id"]) => void;
}

export const RadioFilter = <TOption extends TDefaultRadioOption>({
  options,
  value,
  onChange,
}: IProps<TOption>) => {
  const { t } = useTranslation("common");

  const handleChange = (event: RadioChangeEvent) => {
    if (is.empty(onChange)) return;

    onChange(event.target.value);
  };

  return (
    <Radio.Group onChange={handleChange} value={value}>
      {options.map((option) => (
        <Radio
          key={option.id}
          value={option.id}
          className="!py-1 !pl-2 !pr-0 c-hover-bg rounded w-full"
        >
          {option.name}
        </Radio>
      ))}
      <Radio value={undefined} className="!py-1 !pl-2 !pr-0 c-hover-bg rounded w-full">
        {t("radio.any")}
      </Radio>
    </Radio.Group>
  );
};
