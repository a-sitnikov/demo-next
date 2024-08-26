"use client";

import { useMemo } from "react";
import { useTranslation } from "@/i18n/client";
import { rangeToString, stringToRange } from "@/utils/filters";
import { is } from "@/utils/type-guards";
import { InputNumber } from "../input-number";

interface IProps {
  value?: string;
  onChange?: (value?: string) => void;
  min?: number;
  max?: number;
}

export const RangeFilter: React.FC<IProps> = ({
  value,
  onChange,
  min: rangeMin,
  max: rangeMax,
}) => {
  const { t } = useTranslation("common");
  const [min, max] = useMemo(() => {
    return stringToRange(value);
  }, [value]);

  const handleChangeMin = (newMin: string | undefined) => {
    if (is.empty(onChange)) return;

    if (is.empty(newMin) && is.empty(max)) {
      onChange(undefined);
    } else {
      onChange(rangeToString([newMin, max]));
    }
  };

  const handleChangeMax = (newMax: string | undefined) => {
    if (is.empty(onChange)) return;

    if (is.empty(min) && is.empty(newMax)) {
      onChange(undefined);
    } else {
      onChange(rangeToString([min, newMax]));
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <InputNumber
        prefix={
          <span className={`group-focus-within:opacity-100 ${is.empty(min) ? "opacity-30 " : ""}`}>
            {t("range.from")}
          </span>
        }
        min={0}
        value={min}
        onChange={handleChangeMin}
        className="grow shrink group"
        placeholder={rangeMin?.toLocaleString()}
        allowClear
      />
      <InputNumber
        prefix={
          <span className={`group-focus-within:opacity-100 ${is.empty(max) ? "opacity-30 " : ""}`}>
            {t("range.to")}
          </span>
        }
        min={0}
        value={max}
        onChange={handleChangeMax}
        className="grow shrink group"
        placeholder={rangeMax?.toLocaleString()}
        allowClear
      />
    </div>
  );
};
