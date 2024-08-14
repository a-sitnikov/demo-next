import { Header } from "antd/es/layout/layout";
import { Search } from "./components/search";
import Link from "next/link";
import { OrdersIcon } from "@/ui/svg/orders";
import { AvatarMenu } from "./components/avatar-menu";
import { BasketButton } from "./components/basket-button";
import Image from "next/image";
import { CatalogButton } from "./components/catalog-button";
import { BonusPoints } from "./components/bonus-points";
import { useServerTranslation } from "@/i18n";

async function getData() {
  return {};
}

export const AppHeader = async () => {
  const { t } = await useServerTranslation();
  const data = await getData();

  return (
    <Header className="flex items-center justify-center gap-4 w-full sticky top-0 z-10">
      <Link href="/" className="flex-shrink-0">
        <Image
          alt="Logo"
          src="/images/logo.png"
          width={135}
          height={40}
          priority={true}
        />
      </Link>
      <CatalogButton />
      <Search />
      <BonusPoints t={t} />
      <Link href={"/orders"} className="flex flex-col items-center gap-1">
        <OrdersIcon />
        <div className="leading-4 text-neutral-500 max-xl:hidden">
          {t("orders")}
        </div>
      </Link>
      <BasketButton />
      <AvatarMenu />
    </Header>
  );
};
