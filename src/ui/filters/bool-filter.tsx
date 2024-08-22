import { Switch } from "antd";
import { is } from "@/utils/type-guards";

interface IProps extends React.PropsWithChildren {
  value?: string;
  onChange?: (value?: string) => void;
}

export const BoolFilter: React.FC<IProps> = ({ children, value, onChange }) => {
  const handleChange = (newValue: boolean) => {
    if (is.empty(onChange)) return;

    onChange(newValue ? "1" : undefined);
  };

  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div className="flex items-center gap-1">{children}</div>
      <Switch checked={!is.empty(value)} onChange={handleChange} />
    </label>
  );
};
