import { mockItems } from "@/mock-data/items";
import { Table, TableColumnsType } from "antd";
import { NameCell } from "./_components/name-cell";
import { IItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Cell, Row } from "./_components/cell";

const columns: TableColumnsType<IItem> = [
  {
    title: "Артикл",
    dataIndex: "id",
  },
  {
    title: "Наименование",
    dataIndex: "name",
    //render: (text, record) => <NameCell text={text} item={record} />,
  },
  {
    title: "Цена",
    dataIndex: "price",
    align: "right",
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

  return <Table columns={columns} dataSource={data} rowKey="id" />;
}
