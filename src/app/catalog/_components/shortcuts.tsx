import { SettingOutlined } from "@ant-design/icons";
import { title } from "process";

export const Shortcuts: React.FC = () => {
  const items = [
    {
      icon: <SettingOutlined />,
      title: "Конфигураторы",
    },
    {
      title: "Выгодные цены",
    },
    {
      title: "Товары с кэшбеком",
    },
  ];

  const featuredCategories = [
    {
      key: 1,
      title: "Модульные автоматы",
    },
    {
      key: 2,
      title: "Кабель ВВГнГ",
    },
  ];

  return (
    <div className="flex gap-4 text-xs">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex gap-1 bg-orange-100 rounded px-2 py-1 cursor-pointer hover:bg-orange-200"
        >
          {item.icon}
          <span>{item.title}</span>
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
