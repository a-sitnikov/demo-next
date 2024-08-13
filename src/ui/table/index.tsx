export interface IColumn {
  id: string;
  title: string;
  align?: "right" | "left";
  headerClassName?: string;
  className?: string;
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
          <th
            key={column.id}
            scope="col"
            className={`px-6 py-4 ${column.headerClassName || ""}`}
          >
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

interface TablleRowProps extends React.PropsWithChildren {
  className?: string;
}

export const TableRow: React.FC<TablleRowProps> = ({ children, className }) => {
  return (
    <tr
      className={`border-b border-neutral-200 dark:border-white/10 ${
        className || ""
      }`}
    >
      {children}
    </tr>
  );
};

interface TableCellProps extends React.PropsWithChildren {
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
}) => {
  return (
    <td className={`whitespace-nowrap px-6 py-4 ${className || ""}`}>
      {children}
    </td>
  );
};
