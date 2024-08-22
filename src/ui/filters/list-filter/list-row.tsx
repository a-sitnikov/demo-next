import { Checkbox, CheckboxProps } from "antd";
import { IFilterOption } from "@/app/api/catalog/route";

interface IProps<TOption extends IFilterOption> extends Omit<CheckboxProps, "onChange"> {
  item: TOption;
  onChange: (itemID: string, checked: boolean) => void;
}

export const ListRow = <TOption extends IFilterOption>({
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
      {item.name}
    </Checkbox>
  );
};
