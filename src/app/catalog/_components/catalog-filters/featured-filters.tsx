"use client";

import Image from "next/image";
import FormItem from "antd/es/form/FormItem";
import { IFilter } from "@/api/catalog";
import { useTranslation } from "@/i18n/client";
import { BoolFilter } from "@/ui/filters/bool-filter";

export const featuredFilters: IFilter[] = [
  {
    id: "in_stock",
    type: "Bool",
    name: "filters.in_stock",
  },
  {
    id: "good_prices",
    type: "Bool",
    name: "filters.good_prices",
    icon: <Image src="/images/discount.png" alt="icon" width={18} height={18} />,
  },
  {
    id: "cashback",
    type: "Bool",
    name: "filters.cashback",
  },
];

export const FeaturedFilters: React.FC = () => {
  const { t } = useTranslation("catalog");

  return (
    <div className="flex flex-col gap-4">
      {featuredFilters.map((item) => (
        <FormItem key={item.id} name={item.id} noStyle>
          <BoolFilter>
            {item.icon}
            {t(item.name || "")}
          </BoolFilter>
        </FormItem>
      ))}
    </div>
  );
};
