"use client";

import { Key, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListProps } from "react-virtualized";
import { Checkbox, Input } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { is } from "@/utils/type-guards";
import { TDefaultListOption } from ".";
import { ListRow } from "./list-row";
import { VirtualList } from "./virtual-list";

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

  const cache = new CellMeasurerCache({
    defaultHeight: 4,
    fixedWidth: true,
  });

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

  const rowRenderer: ListProps["rowRenderer"] = ({ key, index, style, parent }) => {
    const item = filteredOptions[index];

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        <ListRow item={item} checked={isChecked(item.id)} onChange={onChange} style={style} />
      </CellMeasurer>
    );
  };

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
