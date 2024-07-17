export interface IItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  description: string;
  img: string;
}

export interface ICategory {
  id: string;
  name: string;
  children?: ICategory[];
}
