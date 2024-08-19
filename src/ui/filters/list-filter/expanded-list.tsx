"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, Input } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { is } from "@/utils/type-guards";
import { TDefaultListOption } from ".";

interface IProps<TOption extends TDefaultListOption> {
  options: TOption[];
  value: TOption["id"][];
  onChange: (id: TOption["id"], checked: boolean) => void;
  onCollapse?: () => void;
}

export const ExpandedList = <TOption extends TDefaultListOption>({
  options,
  value,
  onChange,
  onCollapse,
}: IProps<TOption>) => {
  const { t } = useTranslation("common");

  const isUpdatedRef = useRef(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isUpdatedRef.current = true;
    setSearch(event.target.value);
  };

  const isChecked = (itemID: TOption["id"]) => {
    return value.some((id) => id === itemID);
  };

  const filteredOptions = useMemo(() => {
    const searchLC = search.toLocaleLowerCase();

    return options.filter((item) => item.title.includes(searchLC));
  }, [search, options]);

  return (
    <div className="flex flex-col">
      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder={t("find")}
        allowClear
        className="!mb-2"
      />
      <div className="flex flex-col overflow-y-auto max-h-80 c-thin-scroll">
        {filteredOptions.map((item) => (
          <Checkbox
            key={item.id}
            checked={isChecked(item.id)}
            onChange={(e) => onChange(item.id, e.target.checked)}
            className="!py-1 !pl-2 !pr-0 c-hover-bg rounded"
          >
            {item.label}
          </Checkbox>
        ))}
        {is.empty(filteredOptions) && <div className="pl-1 c-text-light">{t("not_found")}</div>}
      </div>
      {!is.empty(search) && !is.empty(onCollapse) ? null : (
        <button
          className="w-fit text-left p-2 pb-0 c-text-light cursor-pointer"
          onClick={onCollapse}
        >
          {t("collapse")}
          <UpOutlined className="text-sm ml-2" />
        </button>
      )}
    </div>
  );
};
