"use client";

import React, { Key, ReactNode, useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useTranslation } from "@/i18n/client";
import { useToggle } from "@/utils/hooks";
import { is } from "@/utils/type-guards";

interface TDefaultItem {
  id: Key;
  title: string;
}

interface IProps<TItem> {
  items: TItem[];
  collapseCount?: number;
}

export const List = <TItem extends TDefaultItem>({ items, collapseCount = 5 }: IProps<TItem>) => {
  const { t } = useTranslation("common");

  const [filteredItems, setFilteredItems] = useState<TItem[]>(() =>
    items.slice(0, collapseCount - 1),
  );

  const { status: expanded, toggle } = useToggle(false);
  const [search, setSearch] = useState("");
  const [selectedIDs, setSelectedIDs] = useState<Set<Key>>(new Set());

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCheckChange = (itemID: Key, checked: boolean) => {
    setSelectedIDs((prevSelectedIDs) => {
      const newSelectedIDs = new Set(prevSelectedIDs);
      if (checked) {
        newSelectedIDs.add(itemID);
      } else {
        newSelectedIDs.delete(itemID);
      }

      return newSelectedIDs;
    });
  };

  useEffect(() => {
    if (expanded) {
      setFilteredItems(items);
    } else {
      setSearch("");
      setFilteredItems(items.slice(0, collapseCount - 1));
    }
  }, [expanded, items, collapseCount]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => item.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase())),
    );
  }, [search, items]);

  let footer: JSX.Element | null;
  if (!is.empty(search)) {
    footer = null;
  } else {
    footer = (
      <button className="w-full text-left p-2">
        {expanded ? (
          <>
            {t("collapse")}
            <UpOutlined className="text-sm ml-2" />
          </>
        ) : (
          <>
            {t("show_more")}
            <DownOutlined className="text-sm ml-2" />
          </>
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      {expanded && (
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder={t("find")}
          allowClear
          className="!mb-2"
        />
      )}
      <div className="flex flex-col overflow-y-auto max-h-80 thin-scroll">
        {filteredItems.map((item) => (
          <Checkbox
            key={item.id}
            checked={selectedIDs.has(item.id)}
            onChange={(e) => handleCheckChange(item.id, e.target.checked)}
            className="!p-1 hover-bg rounded"
          >
            {item.title}
          </Checkbox>
        ))}
      </div>
      <div className="text-neutral-400 cursor-pointer" onClick={toggle}>
        {footer}
      </div>
    </div>
  );
};
