"use client";

import { Switch } from "antd";
import Image from "next/image";

const items = [
  {
    key: "1",
    title: "В наличии",
  },
  {
    key: "2",
    title: "Выгодные цены",
    icon: (
      <Image src="/images/discount.png" alt="icon" width={18} height={18} />
    ),
  },
  {
    key: "3",
    title: "Товары с кэшбэком",
  },
];

export const FeaturedFilters = () => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-1">
            {item.icon}
            {item.title}
          </div>
          <Switch />
        </label>
      ))}
    </div>
  );
};
