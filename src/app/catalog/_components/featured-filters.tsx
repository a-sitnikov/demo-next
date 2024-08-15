"use client";

import Image from "next/image";
import { Switch } from "antd";
import { useTranslation } from "@/i18n/client";

const items = [
  {
    key: "1",
    title: "filters.in_stock",
  },
  {
    key: "2",
    title: "filters.good_prices",
    icon: (
      <Image src="/images/discount.png" alt="icon" width={18} height={18} />
    ),
  },
  {
    key: "3",
    title: "filters.cashback",
  },
];

export const FeaturedFilters: React.FC = () => {
  const { t } = useTranslation("catalog");

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <label
          key={item.key}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-1">
            {item.icon}
            {t(item.title)}
          </div>
          <Switch />
        </label>
      ))}
    </div>
  );
};
