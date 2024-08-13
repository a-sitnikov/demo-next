import { is } from "@/utils/type-guards";

interface IProps {
  text?: string;
  count: number;
}

export const SearchInfo: React.FC<IProps> = ({ text, count }) => {
  if (is.empty(text)) return null;

  return (
    <div className="flex gap-2 items-center">
      <span className="font-medium">{text}</span>
      <span className="text-sm text-slate-400">{count}</span>
    </div>
  );
};
