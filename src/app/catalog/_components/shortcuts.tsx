import { mockCategories } from "@/mock-data/categories";
import { IWithTranslate } from "@/utils/types";
import { SettingOutlined } from "@ant-design/icons";

const items = [
  {
    icon: <SettingOutlined />,
    title: "shortcuts.configurators",
  },
  {
    title: "filters.good_prices",
  },
  {
    title: "filters.cashback",
  },
];

export const Shortcuts: React.FC<IWithTranslate> = ({ t }) => {
  const featuredCategories = [mockCategories[0], mockCategories[1]];

  return (
    <div className="flex gap-4 text-xs">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex gap-1 bg-orange-100 rounded px-2 py-1 cursor-pointer hover:bg-orange-200"
        >
          {item.icon}
          <span>{t(item.title)}</span>
        </div>
      ))}
      {featuredCategories.map((item) => (
        <div
          key={item.title}
          className="flex gap-1 bg-orange-100 rounded px-2 py-1 cursor-pointer hover:bg-orange-200"
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};
