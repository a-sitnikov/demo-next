import Link from "next/link";
import { SettingOutlined } from "@ant-design/icons";
import { mockCategories } from "@/mock-data/categories";
import { IWithTranslate } from "@/utils/types";

const items = [
  {
    icon: <SettingOutlined />,
    title: "shortcuts.configurators",
    href: "/configurators",
  },
  {
    title: "filters.good_prices",
    href: "/catalog?good_prices=1",
  },
  {
    title: "filters.cashback",
    href: "/catalog?cashback=1",
  },
];

export const Shortcuts: React.FC<IWithTranslate> = ({ t }) => {
  const featuredCategories = [mockCategories[0], mockCategories[1]];

  return (
    <div className="flex gap-4 text-xs">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex gap-1 c-active-bg c-hover-active-bg rounded px-2 py-1 cursor-pointer"
          prefetch={false}
        >
          {item.icon}
          <span>{t(item.title)}</span>
        </Link>
      ))}
      {featuredCategories.map((item) => (
        <div
          key={item.title}
          className="flex gap-1 c-active-bg c-hover-active-bg rounded px-2 py-1 cursor-pointer"
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};
