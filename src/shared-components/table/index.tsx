import { QtyCell } from "@/app/_components/qty-cell";
import { is } from "@/utils/type-guards";

export interface IColumn {
  id: string;
  title: string;
  align?: "right" | "left";
}

export const Table: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
      {children}
    </table>
  );
};

export interface TableHeadProps {
  columns: IColumn[];
}

export const TableHead: React.FC<TableHeadProps> = ({ columns }) => {
  return (
    <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
      <tr>
        {columns.map((column) => (
          <th key={column.id} scope="col" className="px-6 py-4">
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TableBody: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <tr className="border-b border-neutral-200 dark:border-white/10">
      {children}
    </tr>
  );
};

export const TableCell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};
