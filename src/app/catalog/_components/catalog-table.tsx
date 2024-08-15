import Link from "next/link";
import { IItem } from "@/api/types";
import { QtyInput } from "@/shared/qty-input";
import {
  IColumn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/ui/table";
import { IWithTranslate } from "@/utils/types";

interface IProps extends IWithTranslate {
  data: IItem[];
}

const columns: IColumn[] = [
  {
    id: "id",
    title: "table.item_id",
    headerClassName: "w-44",
  },
  {
    id: "name",
    title: "table.name",
  },
  {
    id: "remains",
    title: "table.remains",
    headerClassName: "text-center w-32",
    className: "text-center",
  },
  {
    id: "price",
    title: "table.price",
    headerClassName: "text-center w-32",
    className: "text-center",
  },
  {
    id: "qty",
    title: "table.qty",
    headerClassName: "text-center w-52",
    className: "text-center w-52",
  },
];

export const CatalogTable: React.FC<IProps> = ({ data, t }) => {
  const cellView = (row: IItem, column: IColumn) => {
    switch (column.id) {
      case "qty":
        return <QtyInput item={row} />;
      case "name":
        return (
          <Link href={`/catalog/${row.id}`} className="webkit-box-3">
            {row[column.id as keyof IItem]}
          </Link>
        );
      default:
        return row[column.id as keyof IItem];
    }
  };

  return (
    <Table>
      <TableHead columns={columns} t={t} />
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
