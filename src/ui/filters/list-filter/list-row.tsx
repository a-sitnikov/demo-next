import { Key, useEffect, useLayoutEffect, useRef } from "react";
import { Checkbox, CheckboxProps, CheckboxRef } from "antd";
import { is } from "@/utils/type-guards";
import { TDefaultListOption } from ".";

interface IProps<TOption extends TDefaultListOption> extends Omit<CheckboxProps, "onChange"> {
  item: TOption;
  onChange: (itemID: TOption["id"], checked: boolean) => void;
}

export const ListRow = <TOption extends TDefaultListOption>({
  item,
  checked,
  onChange,
  ...props
}: IProps<TOption>) => {
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(item.id, e.target.checked)}
      className="!py-1 !pl-2 !pr-0 c-hover-bg rounded"
      {...props}
    >
      {item.label}
    </Checkbox>
  );
};
