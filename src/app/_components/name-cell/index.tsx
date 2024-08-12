import { IItem } from "@/api/types";

interface IProps {
  text: string;
  item: IItem;
}

export const NameCell: React.FC<IProps> = ({ text, item }) => {
  return <span>{text}</span>;
};
