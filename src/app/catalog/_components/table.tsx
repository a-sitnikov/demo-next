import { IItem } from "@/api/types";

interface IColumn {
  id: string;
  title: string;
  align?: "right" | "left";
}

interface IProps {
  data: IItem[];
  columns: IColumn[];
}

export default function Table({ data, columns }: IProps) {
  return (
    <table className="min-w-full text-left text-sm font-light text-surface dark:text-white"></table>
  );
}
