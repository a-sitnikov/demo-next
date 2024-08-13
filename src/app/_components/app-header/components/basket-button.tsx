"use client";

import { useAppSelector } from "@/strore/hooks";
import { BasketIcon } from "@/ui/svg/basket";
import Link from "next/link";

export const BasketButton: React.FC = () => {
  const sum = useAppSelector((state) => state.basket.sum);

  return (
    <Link href={"/basket"} className="flex flex-col items-center gap-1">
      <BasketIcon />
      <div className="leading-4 text-neutral-500 max-xl:hidden">
        Корзина {sum}
      </div>
    </Link>
  );
};
