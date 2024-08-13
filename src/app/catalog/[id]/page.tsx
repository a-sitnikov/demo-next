interface IProps {
  params: {
    id: string;
  };
}

export default function CatalogItem({ params }: IProps) {
  return <div>{params.id}</div>;
}
