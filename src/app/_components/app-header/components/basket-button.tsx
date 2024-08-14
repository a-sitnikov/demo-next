"use client";

import { useAppSelector } from "@/strore/hooks";
import { BasketIcon } from "@/ui/svg/basket";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const BasketButton: React.FC = () => {
  const { t } = useTranslation();
  const sum = useAppSelector((state) => state.basket.total);

  return (
    <Link href={"/basket"} className="flex flex-col items-center gap-1">
      <BasketIcon />
      <div className="leading-4 text-neutral-500 max-xl:hidden">
        {t("basket")} {sum}
      </div>
    </Link>
  );
};
