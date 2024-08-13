import { IItem } from "@/api/types";
import { QtyInput } from "@/ui/qty-input";
import {
  IColumn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/ui/table";
import Link from "next/link";

interface IProps {
  data: IItem[];
}

const columns: IColumn[] = [
  {
    id: "id",
    title: "Артикул",
    headerClassName: "w-44",
  },
  {
    id: "name",
    title: "Наименование",
  },
  {
    id: "remains",
    title: "Остаток",
    headerClassName: "text-center w-32",
    className: "text-center w-32",
  },
  {
    id: "price",
    title: "Цена",
    headerClassName: "text-center w-32",
    className: "text-center w-32",
  },
  {
    id: "qty",
    title: "Количество",
    headerClassName: "text-center w-52",
    className: "text-center w-52",
  },
];

export const CatalogTable: React.FC<IProps> = ({ data }) => {
  const cellView = (row: IItem, column: IColumn) => {
    switch (column.id) {
      case "qty":
        return <QtyInput item={row} />;
      case "name":
        return (
          <Link href={`/catalog/${row.id}`}>
            {row[column.id as keyof IItem]}
          </Link>
        );
      default:
        return row[column.id as keyof IItem];
    }
  };

  return (
    <Table>
      <TableHead columns={columns} />
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.id} className={column.className}>
                {cellView(row, column)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
