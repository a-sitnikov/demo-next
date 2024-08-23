"use client";

import classNames from "classnames";
import { LeftOutlined } from "@ant-design/icons";
import { ICategory } from "@/api/catalog";
import { useTranslation } from "@/i18n/client";
import { BlockWithHeader } from "@/ui/block-with-header";
import { is } from "@/utils/type-guards";
import { useCatalogContext } from "../context";

interface IProps {
  items: ICategory[];
  value?: string;
  onChange?: (value: string) => void;
}

export const _CategoryTree: React.FC<IProps> = ({ items, value, onChange }) => {
  const { t } = useTranslation("common");
  const valueIndex = items.findIndex((item) => item.id === value);

  return (
    <BlockWithHeader title={t("category")}>
      <div className="w-full">
        {items.map((item, i) => (
          <div
            key={item.id}
            onClick={i === valueIndex || is.empty(onChange) ? undefined : () => onChange(item.id)}
            className={classNames(
              "w-full py-1 pl-1 pr-0 c-hover-bg rounded flex gap-1 items-start",
              {
                "cursor-pointer": i !== valueIndex,
                "c-active-bg hover:c-active-bg": i === valueIndex,
                "pl-6": i >= valueIndex,
              },
            )}
          >
            {i < valueIndex && <LeftOutlined className="text-sm mt-[0.35rem]" />}
            {item.title}
          </div>
        ))}
      </div>
    </BlockWithHeader>
  );
};

export const CategoryTree: React.FC<Omit<IProps, "items">> = (props) => {
  const { categories } = useCatalogContext();

  return <_CategoryTree items={categories} {...props} value={"1.2"} />;
};
