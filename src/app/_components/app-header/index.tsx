import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useServerTranslation } from "@/i18n";
import { mockBasket } from "@/mock-data/basket";
import { mockCategories } from "@/mock-data/categories";
import { OrdersIcon } from "@/ui/svg/orders";
import { AvatarMenu } from "./avatar-menu";
import { BasketButton } from "./basket-button";
import { BonusPoints } from "./bonus-points";
import { CatalogButton } from "./catalog-button";
import { Search } from "./search";
import { UpdateStore } from "./update-store";

async function getData() {
  return { basket: mockBasket, categories: mockCategories };
}

export const AppHeader = async () => {
  const { t } = await useServerTranslation();
  const data = await getData();

  return (
    <header className="flex items-center justify-center gap-4 h-20 w-full sticky top-0 z-10 px-2 bg-white">
      <UpdateStore data={data} />
      <Link href="/" className="flex-shrink-0">
        <Image alt="Logo" src="/images/logo.png" width={135} height={40} priority={true} />
      </Link>
      <CatalogButton />
      <Search />
      <BonusPoints t={t} />
      <Link href={"/orders"} className="flex flex-col items-center gap-1">
        <OrdersIcon />
        <div className="leading-4 text-neutral-500 max-xl:hidden">{t("header.orders")}</div>
      </Link>
      <BasketButton />
      <AvatarMenu />
    </header>
  );
};
