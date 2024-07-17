import { Avatar, Button, Dropdown, Input, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { Search } from "./search";
import Link from "next/link";
import { OrdersIcon } from "@/ui/svg/orders";
import { BasketIcon } from "@/ui/svg/basket";
import { AvatarMenu } from "./avatar-menu";

export const AppHeader: React.FC = () => {
  return (
    <Header className="flex items-center justify-center gap-4 w-full">
      <div>Logo</div>
      <Button type="primary" size="large">
        Каталог
      </Button>
      <Search />
      <Link href={"/orders"} className="flex flex-col items-center gap-1">
        <OrdersIcon />
        <div className="leading-4 text-neutral-500 max-xl:hidden">Заказы</div>
      </Link>
      <Link href={"/basket"} className="flex flex-col items-center gap-1">
        <BasketIcon />
        <div className="leading-4 text-neutral-500 max-xl:hidden">Корзина</div>
      </Link>
      <AvatarMenu />
    </Header>
  );
};
