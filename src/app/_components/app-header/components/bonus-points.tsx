import { BatteryIcon } from "@/ui/svg/battery";
import { IWithTranslate } from "@/utils/types";
import Link from "next/link";

export const BonusPoints: React.FC<IWithTranslate> = ({ t }) => {
  return (
    <Link href={"/basket"} className="flex flex-col items-center gap-1">
      <BatteryIcon className="text-slate-950" />
      <div className="leading-4 text-neutral-500 max-xl:hidden">
        {t("points")}
      </div>
    </Link>
  );
};
