"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { IFilterOption } from "@/app/api/catalog/route";
import { toArray } from "@/utils/array";
import { is } from "@/utils/type-guards";
import { ListRow } from "./list-row";
import { VirtualList } from "./virtual-list";

interface IProps<TOption extends IFilterOption> {
  options: TOption[];
  value: string | string[];
  onChange: (id: string, checked: boolean) => void;
  onCollapse?: () => void;
}

export const ExpandedList = <TOption extends IFilterOption>({
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
    return toArray(value).some((id) => id === itemID);
  };

  const filteredOptions = useMemo(() => {
    const searchLC = search.toLocaleLowerCase();

    return options.filter((item) => item.name.toLocaleLowerCase().includes(searchLC));
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
      {filteredOptions.length > 12 ? (
        <div className="h-80">
          <VirtualList options={filteredOptions} onChange={onChange} isChecked={isChecked} />
        </div>
      ) : (
        <div className="flex flex-col overflow-y-auto max-h-80 c-thin-scroll">
          {filteredOptions.map((item) => (
            <ListRow key={item.id} item={item} checked={isChecked(item.id)} onChange={onChange} />
          ))}
          {is.empty(filteredOptions) && <div className="pl-1 c-text-light">{t("not_found")}</div>}
        </div>
      )}
      {!is.empty(search) && !is.empty(onCollapse) ? null : (
        <div className="w-fit text-left p-2 pb-0 c-text-light cursor-pointer" onClick={onCollapse}>
          {t("collapse")}
          <UpOutlined className="text-sm ml-2" />
        </div>
      )}
    </div>
  );
};
