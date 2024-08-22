import Link from "next/link";
import { BatteryIcon } from "@/ui/svg/battery";
import { IWithTranslate } from "@/utils/types";

export const BonusPoints: React.FC<IWithTranslate> = ({ t }) => {
  return (
    <Link href={"/basket"} className="flex flex-col items-center gap-1">
      <BatteryIcon className="text-gray-950" />
      <div className="leading-4 text-neutral-500 max-xl:hidden">
        {t("header.points")}
      </div>
    </Link>
  );
};
