"use client";

import Link from "next/link";
import { useMemo } from "react";
import { IItem } from "@/api/catalog";
import { useTranslation } from "@/i18n/client";
import { QtyInput } from "@/shared/qty-input";
import { IColumn, Table, TableBody, TableCell, TableHead, TableRow } from "@/ui/table";
import { useCatalogContext } from "../context";

interface IProps {
  items: IItem[];
}

export const _CatalogTable: React.FC<IProps> = ({ items }) => {
  const { t } = useTranslation("catalog");

  const columns = useMemo<IColumn[]>(
    () => [
      {
        id: "id",
        title: t("table.item_id"),
        headerClassName: "w-44",
      },
      {
        id: "name",
        title: t("table.name"),
      },
      {
        id: "remains",
        title: t("table.remains"),
        headerClassName: "text-center w-32",
        className: "text-center",
      },
      {
        id: "price",
        title: t("table.price"),
        headerClassName: "text-center w-32",
        className: "text-center",
      },
      {
        id: "qty",
        title: t("table.qty"),
        headerClassName: "text-center w-52",
        className: "text-center w-52",
      },
    ],
    [t],
  );

  const cellView = (row: IItem, column: IColumn) => {
    switch (column.id) {
      case "qty":
        return <QtyInput item={row} />;
      case "name":
        return (
          <Link href={`/catalog/${row.id}`} className="c-webkit-box-3" prefetch={false}>
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
        {items.map((row) => (
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

export const CatalogTable: React.FC<Omit<IProps, "items">> = (props) => {
  const { items, loading } = useCatalogContext();

  return (
    <>
      <_CatalogTable items={items} {...props} />
      {loading && <span>Loading</span>}
    </>
  );
};
