import { Avatar, Dropdown, MenuProps } from "antd";

export const AvatarMenu: React.FC = () => {
  const menu: MenuProps = {
    items: [
      {
        key: "1",
        label: "Меню 1",
      },
      {
        key: "2",
        label: "Меню 2",
      },
    ],
  };

  return (
    <Dropdown trigger={["click"]} menu={menu} placement="bottomRight">
      <Avatar size="large" className="flex-shrink-0 cursor-pointer" />
    </Dropdown>
  );
};
