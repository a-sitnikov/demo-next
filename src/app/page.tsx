import { mockItems } from "@/mock-data/items";
import {
  IColumn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/shared-components/table";
import { QtyCell } from "./_components/qty-cell";
import { IItem } from "@/api/types";

const columns: IColumn[] = [
  {
    id: "id",
    title: "Артикл",
  },
  {
    id: "name",
    title: "Наименование",
  },
  {
    id: "remain",
    title: "Остаток",
    align: "right",
  },
  {
    id: "price",
    title: "Цена",
    align: "right",
  },
  {
    id: "qty",
    title: "Количество",
  },
];

async function getData(search?: string | null) {
  if (search === null || search === undefined) {
    return Promise.resolve(mockItems);
  }

  return Promise.resolve(
    mockItems.filter((item) => item.name.includes(search))
  );
}

interface IProps {
  searchParams?: {
    search?: string;
  };
}

export default async function Home({ searchParams }: IProps) {
  const data = await getData(searchParams?.search);

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHead columns={columns} />
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => {
                return (
                  <TableCell key={column.id}>
                    {column.id === "qty" ? (
                      <QtyCell item={row} />
                    ) : (
                      row[column.id as keyof IItem]
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
